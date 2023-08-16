import ImageCache from '../image-cache';

export default function (ctx, shape) {
	let img = ImageCache.get(shape.src);
	if (img) {
		ctx.drawImage(img, shape.x, shape.y, shape.width, shape.height);
	}
}
