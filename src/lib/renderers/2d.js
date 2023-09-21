import Registry from '../registry.js';
import Renderer from './renderer.js';
import {
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

export default class Renderer2d extends Renderer {
	#target = new OffscreenCanvas(0,0);
	#transform = new DOMMatrix();

	/**
	 * Clear the canvas.
	 */
	clear() {
		this.context.reset();
	}

	get context() {
		return this.#target.getContext('2d');
	}

	/**
	 * @param {Object} shape
	 */
	draw(shape) {
		var path = null;

		var renderer = Registry.get(shape.type) || shape;
		if (renderer instanceof Function) {
			let { context: ctx } = this;
			ctx.setTransform(this.#transform);
			path = renderer.call(shape, {
				ctx,
				draw: true,
			});
		}

		return path;
	}

	getPath(shape) {
		var path = null;

		var renderer = Registry.get(shape.type) || shape;
		if (renderer instanceof Function) {
			let { context: ctx } = this;
			ctx.setTransform(this.#transform);
			path = renderer.call(shape, {
				ctx,
				draw: false,
			});
		}

		return path;
	}

	get height() {
		return this.#target.height;
	}
	set height(h) {
		this.#target.height = h ?? 0;
	}

	/**
	 * @param {RenderContext} ctx
	 * @returns {boolean}
	 */
	static isValidRenderingContext(ctx) {
		switch (true) {
			case ctx instanceof CanvasRenderingContext2D:
			case ctx instanceof OffscreenCanvasRenderingContext2D: {
				return true;
			}
		}
		console.warn('Unsupported rendering context provided!', ctx);
		return false;
	}

	/**
	 * @param {RenderTarget} target
	 * @returns {boolean}
	 */
	static isValidRenderTarget(target) {
		switch (true) {
			case target instanceof HTMLCanvasElement:
			case target instanceof OffscreenCanvas: {
				return true;
			}
		}
		console.warn('Unsupported rendering target provided!', target);
		return false;
	}

	restoreState() {
		this.context.restore();
	}

	saveState() {
		this.context.save();
	}

	get target() {
		return this.#target;
	}
	set target(canvas) {
		if (typeof canvas == 'string') {
			canvas = document.querySelector(canvas);
		}

		if (Renderer2d.isValidRenderTarget(canvas)) {
			this.#target = canvas;
		}
	}

	get transform() {
		return this.#transform;
	}
	set transform(transform) {
		if (isAffineMatrix(transform)) {
			this.#transform = transform;
		}
	}

	get width() {
		return this.#target.width;
	}
	set width(w) {
		this.#target.width = w ?? 0;
	}
}
