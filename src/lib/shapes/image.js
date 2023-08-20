import {
	ClearShadow,
	Image,
	Stroke,
	Style,
} from '../filters';
import Renderer from '../renderers/2d';

export default function (ctx) {
	var path = new Path2D();

	if (typeof this == 'object') {
		path.rect(this.x, this.y, this.width, this.height);
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		Style(ctx, this);
		Image(ctx, this);
		ClearShadow(ctx);
		Stroke(ctx, path);
	}

	return path;
}
