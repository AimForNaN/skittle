export default class Renderer {
	static key = 'type';

	clear() {
		throw new Error('Trying to call abstract method!');
	}

	get context() {
		throw new Error('Trying to access abstract property!');
	}

	/**
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
	 * @param {RenderContext} ctx
	 * @returns {boolean}
	 */
	static isValidRenderingContext(ctx) {
		throw new Error('Trying to access abstract static method!');
	}

	get target() {
		throw new Error('Trying to access abstract property!');
	}
	set target(v) {
		throw new Error('Trying to set abstract property!');
	}

	get transform() {
		throw new Error('Trying to access abstract property!');
	}
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
