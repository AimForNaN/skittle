import {
	compose,
	isAffineMatrix,
} from 'transformation-matrix';
import normalizeOriginRect from './normalize-origin-rect';
import normalizeRotation from './normalize-rotation';
import normalizeScale from './normalize-scale';
import normalizeTranslate from './normalize-translate';

export default function (transform) {
	if (isAffineMatrix(transform)) {
		return transform;
	}

	var ret = [new DOMMatrix()];
	if (typeof transform == 'object') {
		ret = [
			normalizeOriginRect(transform.origin),
			normalizeTranslate(transform.translate),
			normalizeRotation(transform.rotate),
			normalizeScale(transform.scale),
			normalizeOriginRect(transform.origin, -1),
		];
	}

	return compose(...ret);
}
