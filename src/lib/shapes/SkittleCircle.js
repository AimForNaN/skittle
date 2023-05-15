import StyledShape from './SkittleStyledShape';

export default class Circle extends StyledShape {
	x;
	y;
	radius;

	constructor(x, y, radius, style) {
		super(style);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	createPath() {
		var path = new Path2D();
		path.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		return path;
	}

	fromObject(shape) {
		return new Circle(
			shape.x,
			shape.y,
			shape.radius,
			shape.style
		);
	}
}
