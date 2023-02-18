import type Skittle from './Skittle';
import type SkittleShape from './shapes/SkittleShape';

export default class SkittleRenderer {
	protected static Shapes: Map<string, TSkittleShapeConstructor<SkittleShape>> = new Map();
	protected layer: Skittle;
	protected transform: DOMMatrix = new DOMMatrix();

	constructor(layer: Skittle) {
		this.layer = layer;
	}

	get context(): TSkittleRenderingContext {
		return this.layer.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	draw(ctx?: TSkittleRenderingContext): SkittleRenderer {
		this.wipe();

		if (!ctx) {
			ctx = this.context;
		}

		ctx.setTransform(this.transform);
		this.layer.forEach((shape) => {
			if (ctx) {
				ctx.save();
				shape.draw(ctx);
				ctx.restore();
			}
		});

		return this;
	}

	static registerShape(name: string, shape: TSkittleShapeConstructor<SkittleShape>) {
		SkittleRenderer.Shapes.set(name, shape);
	}

	resetTransform(): SkittleRenderer {
		this.context.resetTransform();
		return this;
	}

	restore(): SkittleRenderer {
		this.context.restore();
		return this;
	}

	rotate(angle: number): SkittleRenderer {
		this.context.rotate(angle);
		return this;
	}

	save(): SkittleRenderer {
		this.context.save();
		return this;
	}

	scale(x: number, y: number): SkittleRenderer {
		this.context.scale(x, y);
		return this;
	}

	setTransform(matrix: DOMMatrix | number[]) {
		if (Array.isArray(matrix)) {
			matrix = new DOMMatrix(matrix);
		}
		this.transform = matrix;
		return this;
	}

	static shapeFromObject(shape: ISkittleShape): SkittleShape | null {
		var factory = this.Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	translate(x: number, y: number): SkittleRenderer {
		this.context.translate(x, y);
		return this;
	}

	wipe(): SkittleRenderer {
		this.context.resetTransform();
		this.context.clearRect(0, 0, this.layer.width, this.layer.height);
		return this;
	}
}