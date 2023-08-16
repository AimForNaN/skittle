import {
	ClearShadow,
	Fill,
	Image,
	Stroke,
} from '../filters';
import Renderer from '../renderers/2d';

export default function (shape, ctx) {
	var path = new Path2D();
	if (typeof shape == 'object') {
		path.rect(shape.x, shape.y, shape.width, shape.height);
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		Image(ctx, path);
		ClearShadowFilter(ctx);
		Stroke(ctx, path);
	}

	return path;
}
