import {
	compose,
	rotateDEG,
} from 'transformation-matrix';

/**
 * Rotate transformation matrix.
 * @param {number} deg
 * @param  {DOMMatrix|import('transformation-matrix').Matrix} t
 * @returns {import('transformation-matrix').Matrix}
 */
export default function (deg, t = new DOMMatrix()) {
	return compose(rotateDEG(deg), t);
}
