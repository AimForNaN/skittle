import {
	compose,
	isAffineMatrix,
	rotateDEG,
	scale,
	translate,
} from 'transformation-matrix';
import ImageCache from '../ImageCache';
import Shape from './SkittleShape';
import Renderer from '../SkittleRenderer';

export default class StyledShape extends Shape {
	background = {};
	border = {};
	opacity = 1;
	shadow = {};
	transform = new DOMMatrix();

	constructor(style) {
		super();
		if (style) {
			this.setStyle(style);
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
						background.repeat ? 'repeat' : 'no-repeat'
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
			StyledShape.clearShadow(ctx);

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

	applyStyle(ctx) {
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

	static clearShadow(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.shadowColor = 'transparent';
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	draw(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			var path = this.createPath();
			ctx.fill(path);
			StyledShape.clearShadow(ctx);
			ctx.stroke(path);
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

	normalizeTransform(transform) {
		if (isAffineMatrix(transform)) {
			return transform;
		}

		var ret = [new DOMMatrix()];
		if (transform) {
			if (typeof transform.scale == 'number') {
				ret.push(scale(transform.scale, transform.scale));
			} else if (typeof transform.scale == 'object') {
				if (
					typeof transform.scale.x == 'number' &&
					typeof transform.scale.y == 'number'
				) {
					ret.push(scale(transform.scale.x, transform.scale.y));
				}
			}

			if (transform.rotate) {
				ret.push(rotateDEG(transform.rotate));
			}

			if (typeof transform.translate == 'object') {
				ret.push(
					translate(transform.translate.x, transform.translate.y)
				);
			}
		}
		return compose(...ret);
	}

	setStyle(style) {
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
