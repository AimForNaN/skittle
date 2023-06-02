import Shape from './SkittleShape';
import {
	FillFilter,
	ShapeStyleFilter,
	RemoveShadowFilter,
	StrokeFilter,
} from '../filters';

export default class Circle extends Shape {
	/** @type {number} */
	x;
	/** @type {number} */
	y;
	/** @type {number} */
	radius;

	constructor(shape) {
		var { x, y, radius, visible, ...etc } = shape;
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.visible = visible;

		this.use(
			new ShapeStyleFilter({ x, y, ...etc }),
			new FillFilter(etc),
			new RemoveShadowFilter(etc),
			new StrokeFilter(etc)
		);
	}

	createPath() {
		var path = new Path2D();
		path.arc(0, 0, this.radius, 0, Math.PI * 2);
		return path;
	}
}
