import {
	translate,
} from 'transformation-matrix';
import { Origin } from '../common';

export function normalizeOrigin(origin, sign = 1) {
	if (typeof origin == 'object') {
		var {x,y} = origin;
	}
	if (Array.isArray(origin)) {
		var [x,y] = origin;
	}

	if (
		typeof x == 'number' &&
		typeof y == 'number'
	) {
		return translate(
			x * sign,
			y * sign
		);
	}

	return new DOMMatrix();
}

export function normalizeOriginRect(shape, origin, sign = 1) {
	if (typeof origin == 'string') {
		switch (origin) {
			case Origin.BottomLeft: {
				return translate(0, shape.height * sign);
			}
			case Origin.BottomRight: {
				return translate(shape.width * sign, shape.height * sign);
			}
			case Origin.Center: {
				return translate(
					(shape.width / 2) * sign,
					(shape.height / 2) * sign
				);
			}
			case Origin.TopRight: {
				return translate(shape.width * sign, 0);
			}
		}
	}

	return normalizeOrigin(origin, sign);

	var ret = [];
	ret.push(translate(shape.x, shape.y));
	ret.push(normalizeTransform(transform));
	ret.push(translate(-shape.x, -shape.y));

	return compose(...ret);
}
