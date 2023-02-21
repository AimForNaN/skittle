import type Shape from './shapes/SkittleShape';
import StyledShape from './shapes/SkittleStyledShape';
import { compose, rotateDEG, scale, translate, type Matrix } from 'transformation-matrix';

export default class Renderer {
	protected static Shapes: Map<string, TSkittleShapeConstructor<Shape>> =
		new Map();
	protected transform: Matrix = new DOMMatrix();

	applyTransform(ctx: CanvasRenderingContext2D) {
		var t = this.transform;
		if (ctx instanceof CanvasRenderingContext2D) {
			ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
		}
	}

	draw(shape: Shape, context: CanvasRenderingContext2D): Renderer {
		if (shape instanceof StyledShape) {
			this.applyTransform(context);
			shape.applyStyle(context);
		}
		shape.draw(context);
		return this;
	}

	static registerShape(name: string, shape: TSkittleShapeConstructor<Shape>) {
		Renderer.Shapes.set(name, shape);
	}

	resetTransform() {
		this.transform = new DOMMatrix();
	}

	rotate(deg: number) {
		this.transform = compose(rotateDEG(deg), this.transform);
	}

	scale(x: number, y: number) {
		this.transform = compose(scale(x, y), this.transform);
	}

	setTransform(transform: Matrix) {
		this.transform = transform;
	}

	static shapeFromObject(shape: ISkittleShape): Shape | null {
		var factory = Renderer.Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	translate(x: number, y: number) {
		this.transform = compose(translate(x, y), this.transform);
	}
}
