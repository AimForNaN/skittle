import ImageCache from './image-cache';
import Renderer from './renderers/renderer';
import Renderer2d from './renderers/2d';
import { Circle, Image, Rect } from './shapes';
import Registry from './registry';
import pullImages from './utils/pull-images';
import transformPoint from './utils/transform-point';
import { isAffineMatrix } from 'transformation-matrix';

Registry.set('circle', Circle);
Registry.set('image', Image);
Registry.set('rect', Rect);

export default class Layer {
	renderer = new Renderer2d();
	shapes = new Set();

	/**
	 * @param {Object | String} target Render target.
	 * @param {import('./renderers/renderer')} [r] Renderer.
	 */
	constructor(target, r) {
		if (r instanceof Renderer) {
			this.renderer = r;
		}

		if (target) {
			this.target = target;
		}
	}

	[Symbol.iterator]() {
		return this.shapes[Symbol.iterator]();
	}

	clear() {
		this.renderer.clear();
		return this;
	}

	get context() {
		return this.renderer.context;
	}

	draw() {
		this.clear();

		for (let shape of this) {
			if (shape.visible !== false) {
				this.renderer.saveState();
				this.renderer.draw(shape);
				this.renderer.restoreState();
			}
		}

		return this;
	}

	/**
	 */
	forEach(fn) {
		this.shapes.forEach(fn);
		return this;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Object} shape
	 * @returns {boolean}
	 */
	isPointInShape(x, y, shape) {
		return this.renderer.isPointInShape(x, y, shape);
	}

	static get key() {
		return Renderer.key;
	}
	static set key(v) {
		Renderer.key = v;
	}

	/**
	 */
	mapPointToCanvas(x, y) {
		const { transform } = this.renderer;
		return transformPoint(x, y, transform);
	}

	/**
	 * Load all images from all shapes and store them to cache.
	 * @returns {Promise<Layer>}
	 */
	preloadImages() {
		return new Promise((resolve, reject) => {
			var queue = [];

			for (let shape of this.shapes) {
				let images = pullImages(shape);

				for (let src of images) {
					queue.push(ImageCache.queue(src));
				}
			}

			Promise.allSettled(queue).then(() => {
				resolve(this);
			});
		});
	}

	/**
	 * Resize canvas element.
	 * @param {number} width Width in pixels
	 * @param {number} height Height in pixels.
	 * @returns {this}
	 */
	resize(width, height) {
		this.renderer.height = height;
		this.renderer.width = width;
		return this;
	}

	/**
	 * Get shape at point relative to canvas element (e.g. MouseEvent.offsetX, MouseEvent.offsetY).
	 * @param {number} x
	 * @param {number} y
	 * @param {boolean} includeHidden
	 * @returns {Shape}
	 */
	shapeAtPoint(x, y, includeHidden = false) {
		var hit = [];
		var shapes = Array.from(this.shapes);
		shapes.reverse();

		var visible = [true, undefined];
		if (includeHidden) {
			visible.push(false);
		}

		return shapes.find((shape) => {
			if (visible.includes(shape.visible)) {
				return this.isPointInShape(x, y, shape);
			}
		});
	}

	set target(v) {
		this.renderer.target = v;
	}

	/**
	 */
	toBlob(type = 'image/jpeg', quality = 0.9) {
		return new Promise((resolve, reject) => {
			var { target } = this.renderer;
			if (target instanceof HTMLCanvasElement) {
				target.toBlob(
					(blob) => {
						if (blob) {
							resolve(obj);
						} else {
							reject('Failed to convert to blob!');
						}
					},
					type,
					quality
				);
			} else if (target instanceof OffscreenCanvas) {
				target.convertToBlob({
					type,
					quality,
				})
				.then((blob) => {
					resolve(blob);
				})
				.catch(reject);
			} else {
				reject('Unsupported canvas!');
			}
		});
	}

	/**
	 * Equivalent to `context.getImageData()`.
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	toData(x, y, width, height) {
		return this.context.getImageData(x, y, width, height);
	}

	/**
	 * @param {string} type Mime type.
	 * @param {number} quality Image quality from 0 to 1.
	 * @returns {Promise}
	 */
	toUrl(type = 'image/jpeg', quality = 0.9) {
		return new Promise((resolve, reject) => {
			this.toBlob(type, quality).then((blob) => {
				var reader = new FileReader();
				reader.addEventListener('load', () => {
					resolve(reader.result);
				});
				reader.readAsDataURL(blob);
			});
		});
	}

	get transform() {
		return this.renderer.transform;
	}
	set transform(v) {
		this.renderer.transform = v;
	}
}
