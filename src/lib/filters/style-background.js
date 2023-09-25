import {
	compose,
	scale,
	translate,
} from 'transformation-matrix';
import ImageCache from '../image-cache';
import Renderer from '../renderers/2d';

export default function (ctx, shape) {
	if (typeof shape != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		ctx.fillStyle = 'transparent';

		if (typeof shape.style != 'object') {
			return;
		}

		if (typeof shape.style.background != 'object') {
			return;
		}

		const { background } = shape.style;

		if (background.image) {
			if (ImageCache.has(background.image)) {
				let pattern = ctx.createPattern(
					ImageCache.get(background.image),
					background.repeat ?? 'repeat'
				);
				if (pattern) {
					let t = new DOMMatrix();
					if (shape) {
						t = compose(t, translate(shape.x, shape.y));
					}
					if (typeof background.size == 'number') {
						t = compose(t, scale(background.size));
					}
					pattern.setTransform(t);
					ctx.fillStyle = pattern;
				} else {
					console.warn(
						`Failed to create pattern from "${background.image}". Make sure image loaded correctly.`
					);
				}
			} else {
				console.warn(
					`Image "${background.image}" not in cache. Make sure image loaded correctly.`
				);
			}
		} else if (background.color) {
			ctx.fillStyle = background.color;
		}
	}
}
