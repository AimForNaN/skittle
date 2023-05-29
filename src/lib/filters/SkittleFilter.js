/**
 * @abstract
 */
export default class Filter {
	/**
	 * Apply filter.
	 * @abstract
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 * @param {import('../shapes/SkittleShape').default} shape
	 */
	apply(ctx, shape) {
		throw new Error('Trying to call abstract method "apply"!');
	}
}
