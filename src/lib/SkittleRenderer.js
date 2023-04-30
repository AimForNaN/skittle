import Shape from './shapes/SkittleShape.js';
import StyledShape from './shapes/SkittleStyledShape.js';
import { compose, rotateDEG, scale, translate } from 'transformation-matrix';

export default class Renderer {
	static #Shapes = new Map();
	#transform = new DOMMatrix();

	applyTransform(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			var t = this.#transform;
			ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	draw(shape, ctx) {
		if (shape instanceof StyledShape) {
			this.applyTransform(ctx);
			shape.applyStyle(ctx);
		}
		shape.draw(ctx);
		return this;
	}

	static isValidRenderingContext(ctx) {
		switch (true) {
			case ctx instanceof CanvasRenderingContext2D:
			case ctx instanceof OffscreenCanvasRenderingContext2D:
				return true;
		}
		return false;
	}

	static isValidRenderTarget(target) {
		switch (true) {
			case target instanceof HTMLCanvasElement:
			case target instanceof OffscreenCanvas:
				return true;
		}
		return false;
	}

	static isValidShape(sh) {
		return sh instanceof Shape || Renderer.#Shapes.has(sh.type);
	}

	static registerShape(name, sh) {
		if (sh.prototype instanceof Shape) {
			Renderer.#Shapes.set(name, sh);
		}
	}

	resetTransform() {
		this.#transform = new DOMMatrix();
	}

	rotate(deg) {
		this.#transform = compose(rotateDEG(deg), this.#transform);
	}

	scale(x, y) {
		this.#transform = compose(scale(x, y), this.#transform);
	}

	setTransform(transform) {
		this.#transform = transform;
	}

	static shapeFromObject(shape) {
		if (shape instanceof Shape) {
			return shape;
		}

		var factory = Renderer.#Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	translate(x, y) {
		this.#transform = compose(translate(x, y), this.#transform);
	}
}
