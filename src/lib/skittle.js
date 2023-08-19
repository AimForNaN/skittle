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

	/**
	 */
	[Symbol.iterator]() {
		return this.shapes[Symbol.iterator]();
	}

	/**
	 */
	clear() {
		this.renderer.clear();
	}

	/**
	 */
	get context() {
		return this.renderer.context;
	}

	/**
	 */
	draw() {
		this.clear();

		for (let shape of this) {
			if (shape.visible !== false) {
				this.renderer.draw(shape);
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
	 */
	get height() {
		this.renderer.height;
	}
	set height(v) {
		this.renderer.height = v;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Object} shape
	 * @param {boolean} includeHidden
	 * @returns {boolean}
	 */
	isPointInShape(x, y, shape) {
		var layer = new Layer();
		layer.resize(this.width, this.height);
		layer.renderer.transform = this.renderer.transform;

		var { context } = layer.renderer;
		var path = layer.renderer.draw(shape);
		return path ? context.isPointInPath(path, x, y) : false;
	}

	/**
	 */
	mapPointToCanvas(x, y) {
		var t = this.context.getTransform();
		return transformPoint(x, y, t);
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
		this.height = height;
		this.width = width;
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

		var visible = [true, undefined];
		if (includeHidden) {
			visible.push(false);
		}

		this.forEach((shape) => {
			if (visible.includes(shape.visible)) {
				if (this.isPointInShape(x, y, shape)) {
					hit.push(shape);
				}
			}
		});

		hit.reverse();
		var [first] = hit;
		return first;
	}

	/**
	 */
	get target() {
		return this.renderer.target;
	}
	set target(target) {
		this.renderer.target = target;
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

	/**
	 */
	get transform() {
		return this.renderer.transform;
	}
	set transform(t) {
		if (isAffineMatrix(t)) {
			this.renderer.transform = t;
		}
	}

	/**
	 */
	get width() {
		this.renderer.width;
	}
	set width(v) {
		this.renderer.width = v;
	}
}
