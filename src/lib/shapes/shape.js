/**
 * @abstract
 */
export default class Shape {
	/** @type {boolean} */
	#visible = true;

	/**
	 * @abstract
	 * @returns {Path2D}
	 */
	createPath(shape) {
		throw new Error('Trying to call abstract method "createPath"!');
	}

	/**
	 * @abstract
	 */
	draw(ctx, shape) {
		throw new Error('Trying to call abstract method "createPath"!');
	}

	/**
	 * @type {boolean}
	 */
	get visible() {
		return this.#visible;
	}

	/**
	 * @param {boolean} v
	 */
	set visible(v) {
		this.#visible = Boolean(v);
	}
}
