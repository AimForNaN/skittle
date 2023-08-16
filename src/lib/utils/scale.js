import {
	compose,
	scale,
} from 'transformation-matrix';

/**
 * Scale matrix.
 * @param {number} x
 * @param {number} y
 * @param {DOMMatrix|import('transformation-matrix').Matrix} [t] Matrix to scale.
 * @returns {import('transformation-matrix').Matrix}
 */
export default function (x, y, t = new DOMMatrix()) {
	return compose(scale(x, y), t);
}
