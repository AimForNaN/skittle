import {
	compose,
	isAffineMatrix,
	rotateDEG,
	scale,
	translate,
} from 'transformation-matrix';
import ImageCache from '../ImageCache';
import Renderer from '../SkittleRenderer';
import RemoveShadowFilter from './SkittleRemoveShadowFilter';

/**
 * @todo Maybe split into separate filters.
 */
export default class StyleFilter extends RemoveShadowFilter {
	background = {};
	border = {};
	opacity = 1;
	shadow = {};
	transform = new DOMMatrix();

	/**
	 * @todo Implement dynamic handling of styles.
	 */
	constructor({ style }) {
		super();
		if (style) {
			this.setStyle(style);
		}
	}

	apply(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			this.applyOpacity(ctx);
			this.applyBackground(ctx);
			this.applyBorder(ctx);
			this.applyShadow(ctx);
			this.applyTransform(ctx);
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	applyBackground(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.fillStyle = 'transparent';

			var { background } = this;
			if (background.image) {
				if (ImageCache.has(background.image)) {
					let pattern = ctx.createPattern(
						ImageCache.get(background.image),
						background.repeat ?? 'repeat'
					);
					if (pattern) {
						if (typeof background.size == 'number') {
							pattern.setTransform(
								compose(scale(background.size))
							);
						}
						ctx.fillStyle = pattern;
					} else {
						console.warn(
							`Failed to create pattern from "${background.image}". Make sure image loaded correctly.`
						);
					}
				} else {
					console.warn(
						`Failed to draw image "${background.image}". Make sure image loaded correctly.`
					);
				}
			} else if (background.color) {
				ctx.fillStyle = background.color;
			}
		} else {
			console.warn('Unsupported rendering context provided!');
		}
	}

	applyBorder(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.strokeStyle = 'transparent';

			var { border } = this;
			if (border.width) {
				ctx.strokeStyle = border.color;
				ctx.lineWidth = border.width;

				switch (border.style) {
					case 'dotted': {
						ctx.setLineDash([2, 2]);
						break;
					}
					case 'dashed': {
						ctx.setLineDash([3, 4]);
						break;
					}
					default: {
						if (Array.isArray(border.style)) {
							ctx.setLineDash(border.style);
						}
					}
				}
			}
		} else {
			console.warn('Unsupported rendering context provided!');
		}
	}

	applyOpacity(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.globalAlpha = this.opacity;
		}
	}

	applyShadow(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			StyleFilter.clearShadow(ctx);

			var { shadow } = this;
			if (shadow.x || shadow.y) {
				ctx.shadowColor = shadow.color;
				ctx.shadowBlur = shadow.blur;
				ctx.shadowOffsetX = shadow.x;
				ctx.shadowOffsetY = shadow.y;
			}
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	applyTransform(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			var t = this.transform;
			ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	get image() {
		var { background } = this;
		if (background && background.image) {
			return background.image;
		}
		return null;
	}

	normalizeOrigin(transform, sign = 1) {
		if (typeof transform.origin == 'object') {
			if (
				typeof transform.origin.x == 'number' &&
				typeof transform.origin.y == 'number'
			) {
				return translate(
					transform.origin.x * sign,
					transform.origin.y * sign
				);
			}
		}
		return new DOMMatrix();
	}

	normalizeRotation(transform) {
		if (typeof transform.rotate == 'number') {
			return rotateDEG(transform.rotate);
		}
		return new DOMMatrix();
	}

	normalizeScale(transform) {
		if (typeof transform.scale == 'number') {
			return scale(transform.scale, transform.scale);
		} else if (typeof transform.scale == 'object') {
			if (
				typeof transform.scale.x == 'number' &&
				typeof transform.scale.y == 'number'
			) {
				return scale(transform.scale.x, transform.scale.y);
			}
		} else if (Array.isArray(transform.scale)) {
			let [x, y] = transform.scale;
			if (typeof x == 'number' && typeof y == 'number') {
				return scale(x, y);
			}
		}
		return new DOMMatrix();
	}

	normalizeTransform(transform) {
		if (isAffineMatrix(transform)) {
			return transform;
		}

		var ret = [new DOMMatrix()];
		if (transform) {
			ret = [
				this.normalizeOrigin(transform),
				this.normalizeTranslate(transform),
				this.normalizeRotation(transform),
				this.normalizeScale(transform),
				this.normalizeOrigin(transform, -1),
			];
		}
		return compose(...ret);
	}

	normalizeTranslate(transform) {
		if (typeof transform.translate == 'object') {
			if (
				typeof transform.translate.x == 'number' &&
				typeof transform.translate.y == 'number'
			) {
				return translate(transform.translate.x, transform.translate.y);
			}
		}
		return new DOMMatrix();
	}

	setStyle(style = {}) {
		if (typeof style.background == 'object') {
			this.background = style.background;
		}
		if (typeof style.border == 'object') {
			this.border = style.border;
		}
		if (Number.isFinite(style.opacity)) {
			this.opacity = style.opacity;
		}
		if (typeof style.shadow == 'object') {
			this.shadow = style.shadow;
		}
		this.transform = this.normalizeTransform(style.transform ?? {});
	}
}
