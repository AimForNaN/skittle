import {
	ClearShadow,
	Image,
	Rect,
	Stroke,
	StyleOpacity,
	StyleShadow,
	StyleTransform,
} from '../filters';
import Renderer2d from '../renderers/2d';

export default function (ctx) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		if (typeof this == 'object') {
			StyleOpacity(ctx, this);
			StyleTransform(ctx, this);
			StyleShadow(ctx, this);
			Rect(ctx, this);
			Image(ctx, this);
			ClearShadow(ctx);
			Stroke(ctx, this);
		}
	}
}
