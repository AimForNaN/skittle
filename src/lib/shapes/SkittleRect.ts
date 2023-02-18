import SkittleStyledShape from './SkittleStyledShape';
import { SkittleOrigin } from '../common';

export default class SkittleRect extends SkittleStyledShape {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(
		x: number,
		y: number,
		width: number,
		height: number,
		style: ISkittleStyle
	) {
		super(style);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	applyTransform(
		transform: ISkittleTransform,
		ctx: CanvasRenderingContext2D
	) {
		switch (transform.origin) {
			case SkittleOrigin.BottomLeft: {
				ctx.translate(0, this.height);
				break;
			}
			case SkittleOrigin.BottomRight: {
				ctx.translate(this.width, this.height);
				break;
			}
			case SkittleOrigin.Center: {
				ctx.translate(this.width / 2, this.height / 2);
				break;
			}
			case SkittleOrigin.TopRight: {
				ctx.translate(this.width, 0);
				break;
			}
		}

		ctx.translate(this.x, this.y);
		ctx.rotate(transform.rotate);
		ctx.scale(transform.scale.x, transform.scale.y)
		ctx.translate(transform.translate.x, transform.translate.y);

		switch (transform.origin) {
			case SkittleOrigin.BottomLeft: {
				ctx.translate(0, -this.height);
				break;
			}
			case SkittleOrigin.BottomRight: {
				ctx.translate(-this.width, -this.height);
				break;
			}
			case SkittleOrigin.Center: {
				ctx.translate(this.width / -2, this.height / -2);
				break;
			}
			case SkittleOrigin.TopRight: {
				ctx.translate(-this.width, 0);
				break;
			}
		}
	}

	createPath(): Path2D {
		var path = new Path2D();
		path.rect(0, 0, this.width, this.height);
		return path;
	}

	fromObject(shape: TSkittleShape): SkittleStyledShape | null {
		if (shape.type == 'rect') {
			return new SkittleRect(
				shape.x,
				shape.y,
				shape.width,
				shape.height,
				shape.style
			);
		}
		return null;
	}
}
