import {
	isAffineMatrix,
	translate,
} from 'transformation-matrix';

export default function (t) {
	if (isAffineMatrix(t)) {
		return t;
	}

	if (typeof t == 'object') {
		var {x,y} = t;
	}
	if (Array.isArray(t)) {
		var [x,y] = t;
	}
	if (
		typeof x == 'number' &&
		typeof y == 'number'
	) {
		return translate(x, y);
	}

	return new DOMMatrix();
}
