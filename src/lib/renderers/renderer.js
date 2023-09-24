export default class Renderer {
	static key = 'type';

	/**
	 * Should clear the canvas.
	 * @abstract
	 */
	clear() {
		throw new Error('Trying to call abstract method!');
	}

	/**
	 * @abstract
	 * @returns Should return rendering context of canvas.
	 */
	get context() {
		throw new Error('Trying to access abstract property!');
	}

	/**
	 * Should initiate rendering.
	 * @abstract
	 * @param {Object} shape
	 */
	draw(shape) {
		throw new Error('Trying to call abstract method!');
	}

	get height() {
		return this.target.height;
	}
	set height(v) {
		this.target.height = Number(v);
	}

	/**
	 * Should check if `ctx` is a rendering context supported by the class.
	 * @abstract
	 * @param {Object} ctx
	 * @returns {boolean}
	 */
	static isValidRenderingContext(ctx) {
		throw new Error('Trying to access abstract static method!');
	}

	/**
	 * Should return canvas reference.
	 * @abstract
	 */
	get target() {
		throw new Error('Trying to access abstract property!');
	}

	/**
	 * Should set canvas reference.
	 * @abstract
	 */
	set target(v) {
		throw new Error('Trying to set abstract property!');
	}

	/**
	 * @abstract
	 * @returns {DOMMatrix} The global transform..
	 */
	get transform() {
		throw new Error('Trying to access abstract property!');
	}

	/**
	 * Should set the global transform.
	 * @abstract
	 */
	set transform(transform) {
		throw new Error('Trying to set abstract property!');
	}

	get width() {
		return this.target.width;
	}
	set width(v) {
		this.target.width = Number(v);
	}
}
