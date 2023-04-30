import StyledShape from './SkittleStyledShape.js';
import { Origin } from '../common.js';
import { compose, translate } from 'transformation-matrix';

export default class Rect extends StyledShape {
	x = 0;
	y = 0;
	width = 0;
	height = 0;

	constructor(x, y, width, height, style) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.setStyle(style);
	}

	createPath() {
		var path = new Path2D();
		path.rect(0, 0, this.width, this.height);
		return path;
	}

	fromObject(shape) {
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

	normalizeTransform(transform) {
		var ret = [];

		switch (transform.origin) {
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
		ret.push(super.normalizeTransform(transform));

		switch (transform.origin) {
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