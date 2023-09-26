import Renderer2d from '../renderers/2d';

export default function (ctx, shape) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		ctx.beginPath();
		ctx.rect(shape.x, shape.y, shape.width, shape.height);
		ctx.closePath();
	}
}
