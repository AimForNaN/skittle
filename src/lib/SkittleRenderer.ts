import type Layer from './Skittle';
import type Shape from './shapes/SkittleShape';
import StyledShape from './shapes/SkittleStyledShape';
import type { Matrix } from 'transformation-matrix';

export default class Renderer {
	protected static Shapes: Map<string, TSkittleShapeConstructor<Shape>> =
		new Map();
	protected transform: TSkittleTransformValue = '';

	draw(layer: Layer, ctx?: TSkittleRenderingContext): Renderer {
		Renderer.wipe(layer);

		if (!ctx) {
			ctx = Renderer.getContext(layer);
		}

		layer.forEach((shape) => {
			if (ctx) {
				ctx.save();
				if (shape instanceof StyledShape) {
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

	setTransform(transform: TSkittleTransformValue) {
		this.transform = transform;
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
