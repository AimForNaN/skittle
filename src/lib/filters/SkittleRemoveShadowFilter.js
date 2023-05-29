import Renderer from '../SkittleRenderer';
import Filter from './SkittleFilter';

export default class RemoveShadowFilter extends Filter {
	/**
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 * @param {import('../shapes/SkittleShape').default} shape
	 */
	apply(ctx, shape) {
		RemoveShadowFilter.clearShadow(ctx);
	}

	/**
	 * @param {import('../SkittleRenderer').RenderContext} ctx
	 */
	static clearShadow(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.shadowColor = 'transparent';
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
		} else {
			console.warn('Unsupported rendering context provided!', ctx);
		}
	}
}