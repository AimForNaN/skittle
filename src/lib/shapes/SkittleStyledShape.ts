import {
	compose,
	rotateDEG,
	scale,
	translate,
	type Matrix,
	type MatrixDescriptor,
} from 'transformation-matrix';
import ImageCache from '../ImageCache';
import Shape from './SkittleShape';

export default abstract class StyledShape extends Shape {
	protected background!: ISkittleBackground;
	protected border!: ISkittleBorder;
	protected shadow!: ISkittleShadow;
	protected transform!: Matrix;

	constructor(style?: ISkittleStyle) {
		super();
		if (style) {
			this.setStyle(style);
		}
	}

	applyBackground(ctx: CanvasRenderingContext2D) {
		var { background } = this;
		if (background.image) {
			if (ImageCache.has(background.image)) {
				let pattern = ctx.createPattern(
					ImageCache.get(background.image) as HTMLImageElement,
					background.repeat
				);
				if (pattern) {
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

	applyBorder(ctx: CanvasRenderingContext2D) {
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

	applyShadow(ctx: CanvasRenderingContext2D) {
		StyledShape.clearShadow(ctx);

		var { shadow } = this;
		if (shadow.x || shadow.y) {
			ctx.shadowColor = shadow.color;
			ctx.shadowBlur = shadow.blur;
			ctx.shadowOffsetX = shadow.x;
			ctx.shadowOffsetY = shadow.y;
		}
	}

	applyTransform(ctx: CanvasRenderingContext2D) {
		var t = this.transform;
		ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
	}

	applyStyle(ctx: CanvasRenderingContext2D) {
		this.applyBackground(ctx);
		this.applyBorder(ctx);
		this.applyShadow(ctx);
		this.applyTransform(ctx);
	}

	static clearShadow(ctx: CanvasRenderingContext2D) {
		ctx.shadowColor = 'transparent';
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}

	draw(ctx: CanvasRenderingContext2D): void {
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

	protected normalizeBackground(
		background: TSkittleBackgroundValue
	): ISkittleBackground {
		var ret: ISkittleBackground = {
			color: 'transparent',
			image: '',
			repeat: 'repeat',
		};

		switch (typeof background) {
			case 'object': {
				ret.color = background.color;
				ret.image = background.image;
				ret.repeat = background.repeat;
				break;
			}
			case 'string': {
				let [color, repeat] = background.split(' ');
				if (color.startsWith('url')) {
					ret.image = color ?? ret.image;
					ret.repeat = repeat ?? ret.repeat;
				} else {
					ret.color = color ?? ret.color;
				}
				break;
			}
		}
		return ret;
	}

	protected normalizeBorder(border?: TSkittleBorderValue): ISkittleBorder {
		var ret: ISkittleBorder = {
			color: 'transparent',
			style: 'solid',
			width: 0,
		};
		switch (typeof border) {
			case 'object': {
				ret.color = border.color;
				ret.style = border.style;
				ret.width = border.width;
				break;
			}
			case 'string': {
				var [width, style, color] = border.split(' ');
				ret.color = color ?? ret.color;
				ret.style = style ?? ret.style;
				ret.width = parseInt(width ?? ret.width);
				break;
			}
		}
		return ret;
	}

	protected normalizeBoxShadow(
		boxShadow?: TSkittleShadowValue
	): ISkittleShadow {
		var ret: ISkittleShadow = {
			x: 0,
			y: 0,
			blur: 0,
			color: 'transparent',
		};
		switch (typeof boxShadow) {
			case 'object': {
				ret.blur = boxShadow.blur;
				ret.color = boxShadow.color;
				ret.x = boxShadow.x;
				ret.y = boxShadow.y;
				break;
			}
			case 'string': {
				var [x, y, blur, color] = boxShadow.split(' ');
				ret.blur = parseInt(blur ?? ret.blur);
				ret.color = color ?? ret.color;
				ret.x = parseInt(x ?? ret.x);
				ret.y = parseInt(y ?? ret.y);
				break;
			}
		}
		return ret;
	}

	protected normalizeTransform(
		transform?: TSkittleTransformValue,
		origin: TSkittleTransformOriginValue = 'center'
	): Matrix {
		var ret: Matrix = new DOMMatrix();
		switch (typeof transform) {
			case 'object': {
				ret = this.normalizeTransformObject(transform);
				break;
			}
			case 'string': {
				ret = this.normalizeTransformString(transform);
				break;
			}
		}
		return ret;
	}

	protected normalizeTransformObject(
		transform: ISkittleTransform,
		transformOrigin: TSkittleTransformOriginValue = 'center'
	): Matrix {
		var ret: Matrix[] = [];
		if (transform.rotate) {
			ret.push(rotateDEG(transform.rotate));
		}

		if (typeof transform.scale == 'object') {
			ret.push(scale(transform.scale.x, transform.scale.y));
		} else if (typeof transform.scale == 'number') {
			ret.push(scale(transform.scale, transform.scale));
		}

		if (typeof transform.translate == 'object') {
			ret.push(translate(transform.translate.x, transform.translate.y));
		}
		return compose(...ret);
	}

	protected normalizeTransformString(
		transform: string,
		transformOrigin: TSkittleTransformOriginValue = 'center'
	): Matrix {
		var ret: Matrix[] = [];
		transform.split(' ').forEach((val) => {
			let matches = val.match(/(?<key>\w+)\((?<val>\w+)\)/);
			if (matches) {
				let { groups } = matches;
				if (groups) {
					let { key, val } = groups;
					switch (key) {
						case 'rotate': {
							ret.push(rotateDEG(parseInt(val)));
							break;
						}
					}
				}
			}
		});
		return compose(...ret);
	}

	setStyle(style: ISkittleStyle) {
		this.background = this.normalizeBackground(style.background);
		this.border = this.normalizeBorder(style.border);
		this.shadow = this.normalizeBoxShadow(style.boxShadow);
		this.transform = this.normalizeTransform(
			style.transform,
			style.transformOrigin
		);
	}

	static toRadians(v: number) {
		return (Math.PI / 180) * v;
	}
}
