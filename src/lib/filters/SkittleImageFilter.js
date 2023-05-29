import ImageCache from '../ImageCache';
import Filter from './SkittleFilter';

export default class ImageFilter extends Filter {
	apply(ctx, shape) {
		let img = ImageCache.get(shape.src);
		if (img) {
			ctx.drawImage(img, 0, 0, shape.width, shape.height);
		}
	}
}