import Renderer from '../renderers/2d';

export default function (ctx, shape) {
	if (typeof shape != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		if (typeof shape.style != 'object') {
			return;
		}

		if (typeof shape.style.opacity != 'number') {
			return;
		}

		const { opacity } = shape.style;
		ctx.globalAlpha = opacity;
	}
}
