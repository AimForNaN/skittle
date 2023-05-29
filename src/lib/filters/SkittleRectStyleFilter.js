import { translate } from 'transformation-matrix';
import { Origin } from '../common';
import ShapeStyleFilter from './SkittleShapeStyleFilter';

/**
 * @todo Could probably use a better name.
 */
export default class RectStyleFilter extends ShapeStyleFilter {
	/** @type {number} */
	height;
	/** @type {number} */
	width;

	constructor(shape) {
		var { height, width, style } = shape;
		super(shape);
		this.width = width;
		this.height = height;
		if (style) {
			this.setStyle(style);
		}
	}

	normalizeOrigin(transform, sign = 1) {
		if (typeof transform.origin == 'string') {
			switch (transform.origin) {
				case Origin.BottomLeft: {
					return translate(0, this.height * sign);
				}
				case Origin.BottomRight: {
					return translate(this.width * sign, this.height * sign);
				}
				case Origin.Center: {
					return translate(
						(this.width / 2) * sign,
						(this.height / 2) * sign
					);
				}
				case Origin.TopRight: {
					return translate(this.width * sign, 0);
				}
			}
		}
		return super.normalizeOrigin(transform, sign);
	}
}
