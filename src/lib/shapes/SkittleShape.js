import Renderer from '../SkittleRenderer';
import SkittleFilter from '../filters/SkittleFilter';

/**
 * @abstract
 */
export default class Shape {
	/** @type {SkittleFilter[]} */
	Filters = new Set();
	/** @type {boolean} */
	#visible = true;

	/**
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 */
	applyFilters(ctx) {
		this.Filters.forEach((filter) => {
			filter.apply(ctx, this);
		});
	}

	clearFilters() {
		this.Filters = new Set();
	}

	/**
	 * @abstract
	 * @returns {Path2D}
	 */
	createPath() {
		throw new Error('Trying to call abstract method "createPath"!');
	}

	/**
	 * Draw shape.
	 * @abstract
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 */
	draw(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			this.applyFilters(ctx);
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}

	/**
	 * Add filters.
	 * @param {...SkittleFilter} filters
	 */
	use(...filters) {
		filters.forEach((filter) => {
			if (filter instanceof SkittleFilter) {
				this.Filters.add(filter);
			}
		});
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
