import {
	compose,
	isAffineMatrix,
	scale,
	translate,
} from 'transformation-matrix';
import ImageCache from '../image-cache';
import Renderer from '../renderers/2d';
import normalizeTransform from '../utils/normalize-transform';

export function applyBackground(background, ctx, shape) {
	if (typeof background != 'object') {
		return;
	}

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
				`Failed to draw image "${background.image}". Make sure image loaded correctly.`
			);
		}
	} else if (background.color) {
		ctx.fillStyle = background.color;
	}
}

export function applyBorder(border, ctx) {
	if (typeof border != 'object') {
		return;
	}

	if (Renderer.isValidRenderingContext(ctx)) {
		if (border.width) {
			ctx.strokeStyle = border.color ?? 'black';
			ctx.lineWidth = border.width;

			switch (border.style) {
				case 'dotted': {
					ctx.setLineDash([2, 2]);
					break;
				}
				case 'dashed': {
					ctx.setLineDash([3, 4]);
					break;
				}
				default: {
					if (Array.isArray(border.style)) {
						ctx.setLineDash(border.style);
					}
				}
			}
		}
	}
}

export function applyOpacity(opacity, ctx) {
	if (typeof opacity != 'number') {
		return;
	}

	ctx.globalAlpha = opacity;
}

export function applyShadow(shadow, ctx) {
	if (typeof shadow != 'object') {
		return;
	}

	ctx.shadowColor = shadow.color ?? 'black';
	ctx.shadowBlur = shadow.blur ?? 0;
	ctx.shadowOffsetX = shadow.x ?? 0;
	ctx.shadowOffsetY = shadow.y ?? 0;
}

export function applyTransform(transform, ctx, shape) {
	if (typeof transform != 'object') {
		return;
	}

	var t = normalizeTransform(transform, shape);
	ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
}

export default function (ctx, shape) {
	ctx.fillStyle = 'transparent';
	ctx.strokeStyle = 'transparent';

	if (typeof shape.style != 'object') {
		return;
	}

	applyOpacity(shape.style.opacity, ctx);
	applyBackground(shape.style.background, ctx, shape);
	applyBorder(shape.style.border, ctx);
	applyShadow(shape.style.shadow, ctx);

	var t = compose(translate(shape.x, shape.y));
	applyTransform(t, ctx);

	applyTransform(shape.style.transform, ctx, shape);

	t = compose(translate(-shape.x, -shape.y));
	applyTransform(t, ctx);
}
