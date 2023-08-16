import {
	compose,
	translate,
} from 'transformation-matrix';

/**
 * Translate matrix.
 * @param {number} x
 * @param {number} y
 * @param {DOMMatrix|Matrix} [t] Matrix to translate.
 * @returns {Matrix}
 */
export default function (x, y, t = new DOMMatrix()) {
	return compose(translate(x, y), t);
}
