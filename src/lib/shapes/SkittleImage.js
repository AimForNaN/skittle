import {
	ImageFilter,
	RectStyleFilter,
	RemoveShadowFilter,
	StrokeFilter,
} from '../filters';
import Rect from './SkittleRect';

export default class Image extends Rect {
	/** @type {string} */
	src;

	constructor(shape) {
		var { src, x, y, width, height, ...etc } = shape;
		super(shape);
		this.src = src;

		this.clearFilters();
		this.use(
			new RectStyleFilter(shape),
			new ImageFilter(etc),
			new RemoveShadowFilter(etc),
			new StrokeFilter(etc)
		);
	}
}
