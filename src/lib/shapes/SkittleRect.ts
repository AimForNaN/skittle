import StyledShape from './SkittleStyledShape';
import { Origin } from '../common';
import { compose, translate, type Matrix } from 'transformation-matrix';

export default class Rect extends StyledShape {
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
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.setStyle(style);
	}

	createPath(): Path2D {
		var path = new Path2D();
		path.rect(0, 0, this.width, this.height);
		return path;
	}

	fromObject(shape: TSkittleShape): StyledShape | null {
		if (shape.type == 'rect') {
			return new Rect(
				shape.x,
				shape.y,
				shape.width,
				shape.height,
				shape.style
			);
		}
		return null;
	}

	protected normalizeTransform(
		transform?: TSkittleTransformValue,
		origin: TSkittleTransformOriginValue = 'center'
	): Matrix {
		var ret: Matrix[] = [];

		switch (origin) {
			case Origin.BottomLeft: {
				ret.push(translate(0, this.height));
				break;
			}
			case Origin.BottomRight: {
				ret.push(translate(this.width, this.height));
				break;
			}
			case Origin.Center: {
				ret.push(translate(this.width / 2, this.height / 2));
				break;
			}
			case Origin.TopRight: {
				ret.push(translate(this.width, 0));
				break;
			}
		}

		ret.push(translate(this.x, this.y));
		ret.push(super.normalizeTransform(transform, origin));

		switch (origin) {
			case Origin.BottomLeft: {
				ret.push(translate(0, -this.height));
				break;
			}
			case Origin.BottomRight: {
				ret.push(translate(-this.width, -this.height));
				break;
			}
			case Origin.Center: {
				ret.push(translate(this.width / -2, this.height / -2));
				break;
			}
			case Origin.TopRight: {
				ret.push(translate(-this.width, 0));
				break;
			}
		}

		return compose(...ret);
	}
}
