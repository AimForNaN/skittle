import {
	ClearShadow,
	Image,
	Rect,
	Stroke,
	StyleBorder,
	StyleOpacity,
	StyleShadow,
	StyleTransform,
} from '../filters';
import Renderer2d from '../renderers/2d';

export default function (ctx) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		if (typeof this == 'object') {
			StyleOpacity(ctx, this);
			StyleBorder(ctx, this);
			StyleShadow(ctx, this);
			StyleTransform(ctx, this);
			Rect(ctx, this);
			Image(ctx, this);
			ClearShadow(ctx);
			Stroke(ctx, this);
		}
	}
}
