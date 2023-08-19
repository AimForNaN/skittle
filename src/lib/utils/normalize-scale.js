import {
	isAffineMatrix,
	scale,
} from 'transformation-matrix';

export default function (s) {
	if (typeof s == 'number') {
		return scale(s, s);
	} 
	if (typeof s == 'object') {
		var {x, y} = s;
	} 
	if (Array.isArray(s)) {
		var [x, y] = s;
	}

	if (
		typeof x == 'number' &&
		typeof y == 'number'
	) {
		return scale(x, y);
	}

	return new DOMMatrix();
}
