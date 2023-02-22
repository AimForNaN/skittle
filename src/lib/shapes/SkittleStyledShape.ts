import {
	compose,
	isAffineMatrix,
	rotateDEG,
	scale,
	translate,
	type Matrix,
} from 'transformation-matrix';
import ImageCache from '../ImageCache';
import Shape from './SkittleShape';

export default abstract class StyledShape extends Shape {
	protected background: ISkittleBackground = {} as ISkittleBackground;
	protected border: ISkittleBorder = {} as ISkittleBorder;
	protected shadow: ISkittleShadow = {} as ISkittleShadow;
	protected transform: Matrix = new DOMMatrix();

	constructor(style?: ISkittleStyle) {
		super();
		if (style) {
			this.setStyle(style);
		}
	}

	applyBackground(ctx: TSkittleRenderingContext) {
		ctx.fillStyle = 'transparent';

		var { background } = this;
		if (background.image) {
			if (ImageCache.has(background.image)) {
				let pattern = ctx.createPattern(
					ImageCache.get(background.image) as HTMLImageElement,
					background.repeat ? 'repeat' : 'no-repeat'
				);
				if (pattern) {
					if (typeof background.size == 'number') {
						pattern.setTransform(compose(scale(background.size)));
					}
					ctx.fillStyle = pattern;
				} else {
					console.warn(
						`Failed to create pattern from ${background.image}`
					);
				}
			} else {
				console.warn(
					`Failed to pull image from cache: ${background.image}`
				);
			}
		} else if (background.color) {
			ctx.fillStyle = background.color;
		}
	}

	applyBorder(ctx: TSkittleRenderingContext) {
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
	}

	applyShadow(ctx: TSkittleRenderingContext) {
		StyledShape.clearShadow(ctx);

		var { shadow } = this;
		if (shadow.x || shadow.y) {
			ctx.shadowColor = shadow.color;
			ctx.shadowBlur = shadow.blur;
			ctx.shadowOffsetX = shadow.x;
			ctx.shadowOffsetY = shadow.y;
		}
	}

	applyTransform(ctx: TSkittleRenderingContext) {
		var t = this.transform;
		ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
	}

	applyStyle(ctx: TSkittleRenderingContext) {
		this.applyBackground(ctx);
		this.applyBorder(ctx);
		this.applyShadow(ctx);
		this.applyTransform(ctx);
	}

	static clearShadow(ctx: TSkittleRenderingContext) {
		ctx.shadowColor = 'transparent';
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}

	draw(ctx: TSkittleRenderingContext): void {
		var path = this.createPath();
		ctx.fill(path);
		StyledShape.clearShadow(ctx);
		ctx.stroke(path);
	}

	get image(): string | null {
		var { background } = this;
		if (background && background.image) {
			return background.image;
		}
		return null;
	}

	protected normalizeTransform(
		transform: ISkittleTransform
	): Matrix {
		if (isAffineMatrix(transform)) {
			return <unknown>transform as Matrix;
		}

		var ret: Matrix[] = [
			new DOMMatrix(),
		];
		if (transform) {
			if (typeof transform.scale == 'number') {
				ret.push(scale(transform.scale, transform.scale));
			}

			if (transform.rotate) {
				ret.push(rotateDEG(transform.rotate));
			}

			if (typeof transform.translate == 'object') {
				ret.push(translate(transform.translate.x, transform.translate.y));
			}
		}
		return compose(...ret);
	}

	setStyle(style: ISkittleStyle) {
		if (typeof style.background == 'object') {
			this.background = style.background;
		}
		if (typeof style.border == 'object') {
			this.border = style.border;
		}
		if (typeof style.shadow == 'object') {
			this.shadow = style.shadow;
		}
		this.transform = this.normalizeTransform(style.transform ?? {});
	}
}
