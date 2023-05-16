import StyledShape from './SkittleStyledShape';
import { Origin } from '../common';
import { compose, isAffineMatrix, translate } from 'transformation-matrix';

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
		return new Rect(
			shape.x,
			shape.y,
			shape.width,
			shape.height,
			shape.style
		);
	}

	normalizeOrigin(transform, sign = 1) {
		if (typeof transform.origin == 'string') {
			switch (transform.origin) {
				case Origin.BottomLeft: {
					return translate(0, this.height * sign);
				}
				case Origin.BottomRight: {
					return translate(this.width * sign, this.height * sign);
				}
				case Origin.Center: {
					return translate(
						(this.width / 2) * sign,
						(this.height / 2) * sign
					);
				}
				case Origin.TopRight: {
					return translate(this.width * sign, 0);
				}
			}
		}
		return super.normalizeOrigin(transform, sign);
	}

	normalizeTransform(transform) {
		if (isAffineMatrix(transform)) {
			return transform;
		}

		var ret = [];

		ret.push(translate(this.x, this.y));
		ret.push(super.normalizeTransform(transform));

		return compose(...ret);
	}
}
