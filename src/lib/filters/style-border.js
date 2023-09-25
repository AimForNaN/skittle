import Renderer from '../renderers/2d';

export default function (ctx, shape) {
	if (typeof shape != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		ctx.lineWidth = 0;
		ctx.strokeStyle = 'transparent';

		if (typeof shape.style != 'object') {
			return;
		}

		if (typeof shape.style.border != 'object') {
			return;
		}

		const { border } = shape.style;

		if (border.width) {
			ctx.strokeStyle = border.color ?? 'black';
			ctx.lineWidth = border.width;

			switch (border.style) {
				case 'dotted': {
					ctx.setLineDash([2, 2]);
					break;
				}
				case 'dashed': {
					ctx.setLineDash([3, 4]);
					break;
				}
				default: {
					if (Array.isArray(border.style)) {
						ctx.setLineDash(border.style);
					}
				}
			}
		}
	}
}
