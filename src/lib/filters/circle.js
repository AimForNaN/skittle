import Renderer2d from '../renderers/2d';

export default function (ctx, shape) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		ctx.beginPath();
		ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
		ctx.closePath();
	}
}
