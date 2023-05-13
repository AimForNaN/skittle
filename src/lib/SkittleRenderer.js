import Shape from './shapes/SkittleShape';
import StyledShape from './shapes/SkittleStyledShape';
import {
	applyToPoint,
	compose,
	isAffineMatrix,
	rotateDEG,
	scale,
	translate,
} from 'transformation-matrix';

/**
 * @typedef RenderContext
 * @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D}
 */

/**
 * @typedef RenderTarget
 * @type {HTMLCanvasElement | OffscreenCanvas}
 */

export default class Renderer {
	static #Shapes = new Map();

	/**
	 * @param {Shape} shape
	 * @param {RenderContext} ctx
	 * @param {DOMMatrix} t
	 */
	static draw(shape, ctx, t = new DOMMatrix()) {
		Renderer.setTransform(ctx, t);
		if (shape instanceof StyledShape) {
			shape.applyStyle(ctx);
		}
		if (shape instanceof Shape) {
			shape.draw(ctx);
		} else if (shape instanceof Function) {
			shape(ctx);
		}
	}

	/**
	 * @param {RenderContext} ctx
	 * @returns {boolean}
	 */
	static isValidRenderingContext(ctx) {
		switch (true) {
			case ctx instanceof CanvasRenderingContext2D:
			case ctx instanceof OffscreenCanvasRenderingContext2D:
				return true;
		}
		return false;
	}

	/**
	 * @param {RenderTarget} target
	 * @returns {boolean}
	 */
	static isValidRenderTarget(target) {
		switch (true) {
			case target instanceof HTMLCanvasElement:
			case target instanceof OffscreenCanvas:
				return true;
		}
		return false;
	}

	static isValidShape(sh) {
		switch (true) {
			case sh instanceof Shape:
			case sh instanceof Function:
			case Renderer.#Shapes.has(sh.type): {
				return true;
			}
		}
		return false;
	}

	/**
	 * Register a shape.
	 * @param {String} name
	 * @param {Shape} sh The definition of the shape.
	 * @returns {boolean} If shape was successfully registered.
	 * @see {@link shapeFromObject}
	 */
	static registerShape(name, sh) {
		if (sh.prototype instanceof Shape) {
			Renderer.#Shapes.set(name, sh);
			return true;
		}
		console.warn('Could not register shape!', name);
		return false;
	}

	static rotate(deg, t = new DOMMatrix()) {
		return compose(rotateDEG(deg), t);
	}

	/**
	 * Scale matrix.
	 * @param {number} x
	 * @param {number} y
	 * @param {DOMMatrix} [t] Matrix to scale.
	 * @returns {import('transformation-matrix').Matrix}
	 */
	static scale(x, y, t = new DOMMatrix()) {
		return compose(scale(x, y), t);
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {DOMMatrix} [t]
	 */
	static setTransform(ctx, t = new DOMMatrix()) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.setTransform(t);
		} else {
			console.warn('Unsupported rendering context provided! Could not set transformation!', ctx);
		}
	}

	/**
	 * Create registered shape from object, if any.
	 * @param {Object} shape
	 * @returns {Shape|null}
	 */
	static shapeFromObject(shape) {
		if (shape instanceof Shape) {
			return shape;
		}
		if (shape instanceof Function) {
			return shape;
		}

		var factory = Renderer.#Shapes.get(shape.type);
		return factory ? factory.prototype.fromObject(shape) : null;
	}

	/**
	 * Transform point.
	 * @param {number} x
	 * @param {number} y
	 * @param {DOMMatrix} [t] Matrix used to transform point.
	 * @returns {{ x: number, y: number }}
	 */
	static transformPoint(x, y, t = new DOMMatrix()) {
		return applyToPoint(t, { x, y });
	}

	/**
	 * Translate matrix.
	 * @param {number} x
	 * @param {number} y
	 * @param {DOMMatrix} [t] Matrix to translate.
	 * @returns {import('transformation-matrix').Matrix}
	 */
	static translate(x, y, t = new DOMMatrix()) {
		return compose(translate(x, y), t);
	}
}
