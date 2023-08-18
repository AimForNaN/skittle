import {
	ClearShadow,
	Fill,
	Stroke,
	Style,
} from '../filters';
import Renderer from '../renderers/2d';

export default function (ctx) {
	var path = new Path2D();

	if (typeof this == 'object') {
		path.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	}

	if (ctx && Renderer.isValidRenderingContext(ctx)) {
		Style(ctx, this);
		Fill(ctx, path);
		ClearShadow(ctx);
		Stroke(ctx, path);
	}

	return path;
}
