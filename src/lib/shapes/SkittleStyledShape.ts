import ImageCache from '../ImageCache';
import Shape from './SkittleShape';

export default abstract class StyledShape extends Shape {
	protected style!: ISkittleStyle;

	constructor(style: ISkittleStyle) {
		super();
		this.setStyle(style);
	}

	applyBackground(
		background: ISkittleBackground,
		ctx: CanvasRenderingContext2D
	) {
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

	applyBorder(border: ISkittleBorder, ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = 'transparent';
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

	applyShadow(boxShadow: ISkittleShadow, ctx: CanvasRenderingContext2D) {
		StyledShape.clearShadow(ctx);
		if (boxShadow.x || boxShadow.y) {
			ctx.shadowColor = boxShadow.color;
			ctx.shadowBlur = boxShadow.blur;
			ctx.shadowOffsetX = boxShadow.x;
			ctx.shadowOffsetY = boxShadow.y;
		}
	}

	abstract applyTransform(
		transform: ISkittleTransform,
		ctx: CanvasRenderingContext2D
	): void;

	applyStyle(ctx: CanvasRenderingContext2D) {
		var { background, border, boxShadow, transform } =
			StyledShape.normalizeStyle(this);

		this.applyBackground(background, ctx);
		this.applyBorder(border, ctx);
		this.applyShadow(boxShadow, ctx);
		this.applyTransform(transform, ctx);
	}

	static clearShadow(ctx: CanvasRenderingContext2D) {
		ctx.shadowColor = 'transparent';
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		var path = this.createPath();
		this.applyStyle(ctx);
		ctx.fill(path);
		StyledShape.clearShadow(ctx);
		ctx.stroke(path);
	}

	static fromObject(shape: TSkittleShape): Shape | null {
		return null;
	}

	static getImage(shape: StyledShape): string | null {
		let { background } = StyledShape.normalizeStyle(shape);
		if (background.image) {
			return background.image;
		}
		return null;
	}

	static normalizeBackground(
		bg?: TSkittleBackgroundValue
	): ISkittleBackground {
		if (typeof bg == 'object') {
			return bg;
		}

		var ret: ISkittleBackground = {
			color: 'transparent',
			image: '',
			repeat: 'repeat',
		};
		if (bg && typeof bg == 'string') {
			var [color, repeat] = bg.split(' ');
			if (color.startsWith('url')) {
				ret.image = color ?? ret.image;
				ret.repeat = repeat ?? ret.repeat;
			} else {
				ret.color = color ?? ret.color;
			}
		}
		return ret;
	}

	static normalizeBorder(border?: TSkittleBorderValue): ISkittleBorder {
		if (typeof border == 'object') {
			return border;
		}

		var ret: ISkittleBorder = {
			color: 'transparent',
			style: 'solid',
			width: 0,
		};
		if (border && typeof border == 'string') {
			var [width, style, color] = border.split(' ');
			ret.color = color ?? ret.color;
			ret.style = style ?? ret.style;
			ret.width = parseInt(width ?? ret.width);
		}
		return ret;
	}

	static normalizeBoxShadow(boxShadow?: TSkittleShadowValue): ISkittleShadow {
		if (typeof boxShadow == 'object') {
			return boxShadow;
		}

		var ret: ISkittleShadow = {
			x: 0,
			y: 0,
			blur: 0,
			color: 'transparent',
		};
		if (boxShadow && typeof boxShadow == 'string') {
			var [x, y, blur, color] = boxShadow.split(' ');
			ret.blur = parseInt(blur ?? ret.blur);
			ret.color = color ?? ret.color;
			ret.x = parseInt(x ?? ret.x);
			ret.y = parseInt(y ?? ret.y);
		}
		return ret;
	}

	static normalizeStyle(shape: StyledShape): ISkittleStyleBase {
		var { style } = shape;
		if (style) {
			return {
				background: StyledShape.normalizeBackground(
					style.background
				),
				border: StyledShape.normalizeBorder(style.border),
				boxShadow: StyledShape.normalizeBoxShadow(
					style.boxShadow
				),
				transform: StyledShape.normalizeTransform(
					style.transform,
					style.transformOrigin
				),
			};
		}

		return {} as ISkittleStyle;
	}

	static normalizeTransform(
		transform?: TSkittleTransformValue,
		origin: TSkittleTransformOriginValue = 'center'
	): ISkittleTransform {
		var ret: ISkittleTransform = {
			origin,
			rotate: 0,
			scale: {
				x: 1,
				y: 1,
			},
			translate: {
				x: 0,
				y: 0,
			},
		};

		if (typeof transform == 'object') {
			if (transform.rotate) {
				ret.rotate = StyledShape.toRadians(transform.rotate);
			}

			if (typeof transform.scale == 'object') {
				ret.scale = transform.scale;
			} else if (typeof transform.scale == 'number') {
				ret.scale.x = transform.scale;
				ret.scale.y = transform.scale;
			}

			if (typeof transform.translate == 'object') {
				ret.translate = transform.translate;
			}
		}

		if (transform && typeof transform == 'string') {
			transform.split(' ').forEach((val) => {
				let matches = val.match(/(?<key>\w+)\((?<val>\w+)\)/);
				if (matches) {
					let { groups } = matches;
					if (groups) {
						let { key, val } = groups;
						switch (key) {
							case 'rotate': {
								ret.rotate = StyledShape.toRadians(parseInt(val));
								break;
							}
						}
					}
				}
			});
		}
		return ret;
	}

	setStyle(style: ISkittleStyle) {
		this.style = style;
	}

	static toRadians(v: number) {
		return (Math.PI / 180) * v;
	}
}
