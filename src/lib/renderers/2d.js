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

	/**
	 * Clear the canvas.
	 */
	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	}

	get context() {
		return this.#target.getContext('2d');
	}

	/**
	 * @param {Object} shape
	 */
	draw(shape) {
		var path = null;
		var { context } = this;
		context.save();

		var renderer = Registry.get(shape.type);
		if (renderer instanceof Function) {
			path = renderer.call(shape, context);
		}

		context.restore();
		return path;
	}

	get height() {
		return this.#target.height;
	}
	set height(h) {
		this.#target.height = h;
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
			case target instanceof OffscreenCanvas:
				return true;
		}
		console.warn('Unsupported rendering target provided!', target);
		return false;
	}

	get target() {
		return this.#target;
	}
	set target(canvas) {
		if (typeof canvas == 'string') {
			canvas = document.querySelector(canvas);
		}

		if (canvas) {
			if (Renderer2d.isValidRenderTarget(canvas)) {
				this.#target = canvas;
			}
		}
	}

	get transform() {
		return this.context.getTransform();
	}
	set transform(transform) {
		if (isAffineMatrix(transform)) {
			this.context.setTransform(transform);
		}
	}

	get width() {
		return this.#target.width;
	}
	set width(w) {
		this.#target.width = w;
	}
}
