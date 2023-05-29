import Filter from './SkittleFilter';

export default class FillFilter extends Filter {
	/**
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 * @param {import('../shapes/SkittleShape').default} shape
	 */
	apply(ctx, shape) {
		ctx.fill(shape.createPath());
	}
}