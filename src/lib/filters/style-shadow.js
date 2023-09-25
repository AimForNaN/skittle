import Renderer from '../renderers/2d';

export default function (ctx, shape) {
	if (typeof shape != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		if (typeof shape.style != 'object') {
			return;
		}

		if (typeof shape.style.shadow != 'object') {
			return;
		}

		const { shadow } = shape.style;
		ctx.shadowColor = shadow.color ?? 'black';
		ctx.shadowBlur = shadow.blur ?? 0;
		ctx.shadowOffsetX = shadow.x ?? 0;
		ctx.shadowOffsetY = shadow.y ?? 0;
	}
}
