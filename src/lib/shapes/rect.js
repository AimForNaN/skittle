import {
	ClearShadow,
	Fill,
	Stroke,
} from '../filters';
import Renderer from '../renderers/2d';

export default function (ctx) {
	var path = new Path2D();

	if (typeof this == 'object') {
		path.rect(this.x, this.y, this.width, this.height);
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		Fill(ctx, path);
		ClearShadow(ctx);
		Stroke(ctx, path);
	}

	return path;
}
