export default class Renderer {
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
		throw new Error('Trying to access abstract property!');
	}
	set height(v) {
		throw new Error('Trying to set abstract property!');
	}

	/**
	 * @param {Object} target
	 */
	target(target) {
		throw new Error('Trying to call abstract method!');
	}

	get width() {
		throw new Error('Trying to access abstract property!');
	}
	set width(v) {
		throw new Error('Trying to set abstract property!');
	}
}
