import {
	compose,
} from 'transformation-matrix';

/**
 * Combine transformation matrices.
 * @param  {...DOMMatrix|import('transformation-matrix').Matrix} t
 * @returns {import('transformation-matrix').Matrix}
 */
export default function (...t) {
	return compose(...t);
}
