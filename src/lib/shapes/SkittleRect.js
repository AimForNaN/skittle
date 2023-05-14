import StyledShape from './SkittleStyledShape';
import { Origin } from '../common';
import { compose, translate } from 'transformation-matrix';

export default class Rect extends StyledShape {
	x = 0;
	y = 0;
	width = 0;
	height = 0;

	constructor(x, y, width, height, style) {
		super(style);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	createPath() {
		var path = new Path2D();
		path.rect(0, 0, this.width, this.height);
		return path;
	}

	fromObject(shape) {
		return new Rect(
			shape.x,
			shape.y,
			shape.width,
			shape.height,
			shape.style
		);
	}

	normalizeTransform(transform) {
		var ret = [];

		if (typeof transform.origin == 'string') {
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
		} else if (typeof transform.origin == 'object') {
			if (
				typeof transform.origin.x == 'number' &&
				typeof transform.origin.y == 'number'
			) {
				ret.push(translate(transform.origin.x, transform.origin.y));
			}
		}

		ret.push(translate(this.x, this.y));
		ret.push(super.normalizeTransform(transform));

		if (typeof transform.origin == 'string') {
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
		} else if (typeof transform.origin == 'object') {
			if (
				typeof transform.origin.x == 'number' &&
				typeof transform.origin.y == 'number'
			) {
				ret.push(translate(-transform.origin.x, -transform.origin.y));
			}
		}

		return compose(...ret);
	}
}
