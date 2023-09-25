import {
	compose,
	translate,
} from 'transformation-matrix';
import Renderer from '../renderers/2d';
import normalizeTransform from '../utils/normalize-transform';

export default function (ctx, shape) {
	if (typeof shape != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		if (typeof shape.style != 'object') {
			return;
		}
		
		if (typeof shape.style.transform != 'object') {
			return;
		}

		const { transform } = shape.style;
		const t = compose(
			translate(shape.x, shape.y),
			normalizeTransform(transform, shape),
			translate(-shape.x, -shape.y),
		);
		ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
	}
}
