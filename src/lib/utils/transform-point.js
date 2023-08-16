import {
	applyToPoint,
} from 'transformation-matrix';

/**
 * Transform point.
 * @param {number} x
 * @param {number} y
 * @param {DOMMatrix} [t] Matrix used to transform point.
 * @returns {{ x: number, y: number }}
 */
export default function (x, y, t = new DOMMatrix()) {
	return applyToPoint(t, { x, y });
}
