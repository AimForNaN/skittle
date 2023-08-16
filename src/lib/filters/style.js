import {
	compose,
	isAffineMatrix,
	rotateDEG,
	scale,
	translate,
} from 'transformation-matrix';
import ImageCache from '../image-cache';
import ClearShadowFilter from './clear-shadow';

export function applyAll(style, ctx) {
	if (typeof style != 'object') {
		return;
	}

	applyOpacity(style.opacity, ctx);
	applyBackground(style.background, ctx);
	applyBorder(style.border, ctx);
	applyShadow(style.shadow, ctx);
	applyTransform(style.transform, ctx);
}

export function applyBackground(background, ctx) {
	if (typeof background != 'object') {
		return;
	}

	ctx.fillStyle = 'transparent';

	if (background.image) {
		if (ImageCache.has(background.image)) {
			let pattern = ctx.createPattern(
				ImageCache.get(background.image),
				background.repeat ?? 'repeat'
			);
			if (pattern) {
				if (typeof background.size == 'number') {
					pattern.setTransform(
						compose(scale(background.size))
					);
				}
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
		ctx.strokeStyle = 'transparent';

		if (border.width) {
			ctx.strokeStyle = border.color;
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

export function applyTransform(t, ctx) {
	if (!isAffineMatrix(t)) {
		return;
	}

	ctx.transform(t.a, t.b, t.c, t.d, t.e, t.f);
}

export default function (ctx, shape) {
	applyAll(shape.style, ctx);
}
