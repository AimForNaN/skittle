import Shape from './shapes/SkittleShape';
import {
	applyToPoint,
	compose,
	rotateDEG,
	scale,
	translate,
} from 'transformation-matrix';

/**
 * @typedef Matrix
 * @type {import('transformation-matrix').Matrix}
 */

/**
 * @typedef RenderContext
 * @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D}
 */

/**
 * @typedef RenderTarget
 * @type {HTMLCanvasElement | OffscreenCanvas}
 */

export default class Renderer {
	/** @type Map<string,Shape> */
	static #Shapes = new Map();

	/**
	 * @param {Shape} shape
	 * @param {RenderContext} ctx
	 * @param {DOMMatrix|Matrix} t
	 */
	static draw(shape, ctx, t = new DOMMatrix()) {
		Renderer.setTransform(ctx, t);
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

	/**
	 * @param {Object} sh
	 * @returns {boolean}
	 */
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
	 * Register a shape. Can be used to override a pre-existing shape.
	 * @param {String} name
	 * @param {Shape} sh The definition of the shape.
	 * @returns {boolean} If shape was successfully registered.
	 * @see {@link shapeFromObject}
	 */
	static registerShape(name, sh) {
		switch (true) {
			case sh.prototype instanceof Shape:
			case sh instanceof Function: {
				Renderer.#Shapes.set(name, sh);
				return true;
			}
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
	 * @param {DOMMatrix|Matrix} [t] Matrix to scale.
	 * @returns {import('transformation-matrix').Matrix}
	 */
	static scale(x, y, t = new DOMMatrix()) {
		return compose(scale(x, y), t);
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {DOMMatrix|Matrix} [t]
	 */
	static setTransform(ctx, t = new DOMMatrix()) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.setTransform(t);
		} else {
			console.warn(
				'Unsupported rendering context provided! Could not set transformation!',
				ctx
			);
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
		if (factory.prototype instanceof Shape) {
			return new factory(shape);
		}
		if (factory instanceof Function) {
			return function (ctx) {
				factory(ctx, shape);
			};
		}
		return null;
	}

	/**
	 * Combine transformation matrices.
	 * @param  {...DOMMatrix|Matrix} t
	 * @returns {Matrix}
	 */
	static transform(...t) {
		return compose(...t);
	}

	/**
	 * Transform point.
	 * @param {number} x
	 * @param {number} y
	 * @param {DOMMatrix|Matrix} [t] Matrix used to transform point.
	 * @returns {{ x: number, y: number }}
	 */
	static transformPoint(x, y, t = new DOMMatrix()) {
		return applyToPoint(t, { x, y });
	}

	/**
	 * Translate matrix.
	 * @param {number} x
	 * @param {number} y
	 * @param {DOMMatrix|Matrix} [t] Matrix to translate.
	 * @returns {Matrix}
	 */
	static translate(x, y, t = new DOMMatrix()) {
		return compose(translate(x, y), t);
	}
}
