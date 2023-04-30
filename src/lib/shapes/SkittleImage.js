import ImageCache from '../ImageCache.js';
import Renderer from '../SkittleRenderer';
import Rect from './SkittleRect.js';

export default class Image extends Rect {
	src;

	constructor(src, x, y, width, height, style) {
		super(x, y, width, height, style);
		this.src = src;
	}

	draw(ctx) {
		if (Renderer.isValidRenderingContext(ctx)) {
			let path = this.createPath();
			ctx.fill(path);

			let img = ImageCache.get(this.src);
			if (img) {
				ctx.drawImage(img, 0, 0, this.width, this.height);
			}

			Image.clearShadow(ctx);
			ctx.stroke(path);
		} else {
			console.warn('Unsupported rendering context provided!');
		}
	}

	fromObject(shape) {
		if (shape.type == 'image') {
			return new Image(
				shape.src,
				shape.x,
				shape.y,
				shape.width,
				shape.height,
				shape.style
			);
		}
		return null;
	}
}
