import { compose, isAffineMatrix, translate } from 'transformation-matrix';
import StyleFilter from './SkittleStyleFilter';

/**
 * @todo Could probably use a better name.
 */
export default class ShapeStyleFilter extends StyleFilter {
	/** @type {number} */
	x;
	/** @type {number} */
	y;

	constructor({ x, y, style }) {
		super({});
		this.x = x;
		this.y = y;
		if (style) {
			this.setStyle(style);
		}
	}

	normalizeTransform(transform) {
		if (isAffineMatrix(transform)) {
			return transform;
		}

		var ret = [];

		ret.push(translate(this.x, this.y));
		ret.push(super.normalizeTransform(transform));

		return compose(...ret);
	}
}
