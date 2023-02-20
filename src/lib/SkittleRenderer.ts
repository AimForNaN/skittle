import type Layer from './Skittle';
import type Shape from './shapes/SkittleShape';

export default class Renderer {
	protected static Shapes: Map<
		string,
		TSkittleShapeConstructor<Shape>
	> = new Map();
	protected transform: DOMMatrix = new DOMMatrix();

	draw(layer: Layer, ctx?: TSkittleRenderingContext): Renderer {
		Renderer.wipe(layer);

		if (!ctx) {
			ctx = Renderer.getContext(layer);
		}

		ctx.setTransform(this.transform);
		layer.forEach((shape) => {
			if (ctx) {
				ctx.save();
				shape.draw(ctx);
				ctx.restore();
			}
		});

		return this;
	}

	static getContext(layer: Layer): TSkittleRenderingContext {
		return layer.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	static registerShape(
		name: string,
		shape: TSkittleShapeConstructor<Shape>
	) {
		Renderer.Shapes.set(name, shape);
	}

	static resetTransform(layer: Layer) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.resetTransform();
		}
	}

	static restore(layer: Layer) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.restore();
		}
	}

	static rotate(layer: Layer, angle: number) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.rotate(angle);
		}
	}

	static save(layer: Layer) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.save();
		}
	}

	static scale(layer: Layer, x: number, y: number) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.scale(x, y);
		}
	}

	setTransform(matrix: DOMMatrix | number[]) {
		if (Array.isArray(matrix)) {
			matrix = new DOMMatrix(matrix);
		}
		this.transform = matrix;
	}

	static shapeFromObject(shape: ISkittleShape): Shape | null {
		var factory = Renderer.Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	static translate(layer: Layer, x: number, y: number) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.translate(x, y);
		}
	}

	static wipe(layer: Layer) {
		var context = Renderer.getContext(layer);
		if (context) {
			context.resetTransform();
			context.clearRect(0, 0, layer.width, layer.height);
		}
	}
}