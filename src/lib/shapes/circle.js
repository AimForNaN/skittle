import {
	ClearShadow,
	Fill,
	Stroke,
} from '../filters';
import Renderer from '../renderers/2d';

export default function (shape, ctx) {
	var path = new Path2D();
	if (typeof shape == 'object') {
		path.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		Fill(ctx, path);
		ClearShadowFilter(ctx);
		Stroke(ctx, path);
	}

	return path;
}
