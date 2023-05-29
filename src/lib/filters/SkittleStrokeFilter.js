import Filter from './SkittleFilter';

export default class StrokeFilter extends Filter {
	/**
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 * @param {import('../shapes/SkittleShape').default} shape
	 */
	apply(ctx, shape) {
		ctx.stroke(shape.createPath());
	}
}