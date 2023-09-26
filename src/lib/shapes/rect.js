import {
	ClearShadow,
	Fill,
	Rect,
	Stroke,
	Style,
} from '../filters';
import Renderer2d from '../renderers/2d';

export default function (ctx) {
	if (Renderer2d.isValidRenderingContext(ctx)) {
		if (typeof this == 'object') {
			Style(ctx, this);
			Rect(ctx, this);
			Fill(ctx);
			ClearShadow(ctx);
			Stroke(ctx);
		}
	}
}
