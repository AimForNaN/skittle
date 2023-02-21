import type Layer from './Skittle';
import type Shape from './shapes/SkittleShape';
import StyledShape from './shapes/SkittleStyledShape';
import { compose, rotateDEG, scale, translate, type Matrix } from 'transformation-matrix';

export default class Renderer {
	protected static Shapes: Map<string, TSkittleShapeConstructor<Shape>> =
		new Map();
	protected transform: Matrix = new DOMMatrix();

	draw(layer: Layer): Renderer {
		var ctx = Renderer.getContext(layer);
		Renderer.wipe(layer);

		if (!ctx) {
			ctx = Renderer.getContext(layer);
		}

		layer.forEach((shape) => {
			if (ctx) {
				ctx.save();
				if (shape instanceof StyledShape) {
					shape.applyTransform(this.transform);
					shape.applyStyle(ctx);
				}
				shape.draw(ctx);
				ctx.restore();
			}
		});

		return this;
	}

	static getContext(layer: Layer): TSkittleRenderingContext {
		return layer.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	static registerShape(name: string, shape: TSkittleShapeConstructor<Shape>) {
		Renderer.Shapes.set(name, shape);
	}

	resetTransform() {
		this.transform = new DOMMatrix();
	}

	static restore(layer: Layer) {
		var ctx = Renderer.getContext(layer);
		if (ctx) {
			ctx.restore();
		}
	}

	rotate(deg: number) {
		this.transform = compose(this.transform, rotateDEG(deg));
	}

	static save(layer: Layer) {
		var ctx = Renderer.getContext(layer);
		if (ctx) {
			ctx.save();
		}
	}

	scale(x: number, y: number) {
		this.transform = compose(this.transform, scale(x, y));
	}

	setTransform(transform: Matrix) {
		this.transform = transform;
	}

	static shapeFromObject(shape: ISkittleShape): Shape | null {
		var factory = Renderer.Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	translate(x: number, y: number) {
		this.transform = compose(this.transform, translate(x, y));
	}

	static wipe(layer: Layer) {
		var ctx = Renderer.getContext(layer);
		if (ctx) {
			ctx.resetTransform();
			ctx.clearRect(0, 0, layer.width, layer.height);
		}
	}
}
