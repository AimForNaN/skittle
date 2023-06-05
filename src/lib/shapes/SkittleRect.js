import {
	FillFilter,
	RectStyleFilter,
	RemoveShadowFilter,
	StrokeFilter,
} from '../filters';
import Shape from './SkittleShape';

export default class Rect extends Shape {
	/** @type {number} */
	x;
	/** @type {number} */
	y;
	/** @type {number} */
	width;
	/** @type {number} */
	height;

	constructor(shape) {
		var { x, y, width, height, visible, ...etc } = shape;
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.visible = visible ?? true;

		this.use(
			new RectStyleFilter(shape),
			new FillFilter(etc),
			new RemoveShadowFilter(etc),
			new StrokeFilter(etc)
		);
	}

	createPath() {
		var path = new Path2D();
		path.rect(0, 0, this.width, this.height);
		return path;
	}
}
