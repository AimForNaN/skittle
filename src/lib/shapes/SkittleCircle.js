import { compose, isAffineMatrix, translate } from 'transformation-matrix';
import { Origin } from '../common';
import StyledShape from './SkittleStyledShape';

export default class Circle extends StyledShape {
	x;
	y;
	radius;

	constructor(x, y, radius, style) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.setStyle(style);
	}

	createPath() {
		var path = new Path2D();
		path.arc(0, 0, this.radius, 0, Math.PI * 2);
		return path;
	}

	fromObject(shape) {
		return new Circle(shape.x, shape.y, shape.radius, shape.style);
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
