export default class ImageCache {
	static #cache = new Map();

	static add(src, img) {
		if (img instanceof HTMLImageElement) {
			ImageCache.#cache.set(src, img);
		}
	}

	static get(src) {
		return ImageCache.#cache.get(src);
	}

	static has(src) {
		return ImageCache.#cache.has(src);
	}

	static queue(src) {
		if (src === null) {
			return Promise.resolve();
		}

		if (ImageCache.has(src)) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			if (typeof src == 'string') {
				var img = new Image();
				img.crossOrigin = 'anonymous';
				img.addEventListener('error', () => {
					console.warn('Failed to load resource.', img.src);
				});
				img.addEventListener('load', () => {
					ImageCache.add(src, img);
					resolve(img);
				});
				img.addEventListener('error', reject);
				img.src = src;
			}
		});
	}
}
