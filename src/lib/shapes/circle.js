import {
	ClearShadow,
	Fill,
	Stroke,
	Style,
} from '../filters';
import Renderer2d from '../renderers/2d';

export default function ({ ctx, draw }) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		let path = new Path2D();

		if (typeof this == 'object') {
			path.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		}

		Style(ctx, this);
		if (draw) {
			Fill(ctx, path);
			ClearShadow(ctx);
			Stroke(ctx, path);
		}

		return path;
	}
}
