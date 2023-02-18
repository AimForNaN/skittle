export default class ImageCache {
	protected static cache: Map<string, HTMLImageElement> = new Map();

	static add(src: string, img: HTMLImageElement) {
		ImageCache.cache.set(src, img);
	}

	static get(src: string) {
		return ImageCache.cache.get(src);
	}

	static has(src: string) {
		return ImageCache.cache.has(src);
	}

	static queueImage(src: string | null) {
		if (src === null) {
			return Promise.resolve();
		}

		if (this.has(src)) {
			return Promise.resolve();
		}

		return new Promise<HTMLImageElement>((resolve, reject) => {
			if (typeof src == 'string') {
				var img = new Image();
				img.crossOrigin = 'Anonymous';
				img.addEventListener('load', () => {
					this.add(src as string, img);
					resolve(img);
				});
				img.addEventListener('error', reject);

				img.src = src;
			}
		});
	}
}