import {
	translate,
} from 'transformation-matrix';
import { Origin } from '../common';

export default function (origin, sign = 1) {
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

