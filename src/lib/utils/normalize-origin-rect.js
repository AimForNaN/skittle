import {
	compose,
	translate,
} from 'transformation-matrix';
import { Origin } from '../common';
import normalizeOrigin from './normalize-origin';

export default function (shape, origin, sign = 1) {
	if (typeof origin == 'string') {
		switch (origin) {
			case Origin.BottomLeft: {
				return translate(0, shape.height * sign);
			}
			case Origin.BottomRight: {
				return translate(shape.width * sign, shape.height * sign);
			}
			case Origin.Center: {
				return translate(
					(shape.width / 2) * sign,
					(shape.height / 2) * sign
				);
			}
			case Origin.TopRight: {
				return translate(shape.width * sign, 0);
			}
		}
	}

	return normalizeOrigin(origin, sign);
}
