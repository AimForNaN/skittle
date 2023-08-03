import ImageCache from './ImageCache';
import Renderer from './SkittleRenderer';
import { Circle, Image, Rect } from './shapes';
import Shape from './shapes/SkittleShape';
import { isAffineMatrix } from 'transformation-matrix';

Renderer.registerShape('circle', Circle);
Renderer.registerShape('image', Image);
Renderer.registerShape('rect', Rect);

export default class Layer {
	#canvas;
	#shapes = new Set();
	#transform = new DOMMatrix();

	/**
	 * @param {import('./SkittleRenderer').RenderTarget | String} canvas
	 */
	constructor(canvas) {
		if (canvas) {
			this.target(canvas);
		} else {
			this.#canvas = new OffscreenCanvas(0, 0);
		}
	}

	/**
	 * @param {Object} shape
	 * @returns {this}
	 */
	addShape(shape) {
		if (Renderer.isValidShape(shape)) {
			if (Renderer.isArbitraryShape(shape)) {
				if (!('visible' in shape)) {
					shape.visible = true;
				}
			}
			this.#shapes.add(shape);
		}
		return this;
	}

	addShapes(shapes) {
		if (Array.isArray(shapes)) {
			shapes.forEach((shape) => {
				this.addShape(shape);
			});
		}
		return this;
	}

	/**
	 * @returns {CanvasRenderingContext2D|OffscreenCanvasRenderingContext2D}
	 */
	get context() {
		return this.#canvas.getContext('2d');
	}

	draw() {
		this.wipe();

		var { context } = this;
		this.forEach((shape) => {
			if (shape.visible || shape instanceof Function) {
				var sh = Renderer.shapeFromObject(shape);
				if (sh) {
					context.save();
					Renderer.draw(sh, context, this.#transform);
					context.restore();
				} else {
					console.warn('Unsupported shape!', shape);
				}
			}
		});
		return this;
	}

	forEach(fn) {
		this.#shapes.forEach(fn);
		return this;
	}

	get height() {
		return this.#canvas ? this.#canvas.height : 0;
	}
	set height(h) {
		this.#canvas.height = h;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {Object} shape
	 * @param {boolean} includeHidden
	 * @returns {boolean}
	 */
	isPointInShape(x, y, shape, includeHidden = false) {
		var layer = new Layer();
		layer.resize(this.width, this.height);

		var visible = [true];
		if (includeHidden) {
			visible.push(false);
		}

		var { context } = layer;
		var sh = Renderer.shapeFromObject(shape);
		if (sh instanceof Shape) {
			if (visible.includes(shape.visible)) {
				Renderer.draw(sh, context, this.#transform);
				return context.isPointInPath(sh.createPath(), x, y);
			}
		}

		return false;
	}

	mapPointToCanvas(x, y) {
		return Renderer.transformPoint(x, y, this.#transform);
	}

	/**
	 * Load all images from all shapes and store them to cache.
	 * @returns {Promise<Layer>}
	 */
	preloadImages() {
		return new Promise((resolve, reject) => {
			var queue = [];
			this.forEach((shape) => {
				let images = [];
				let sh = Renderer.shapeFromObject(shape);
				if (sh instanceof Shape) {
					images = sh.images;
				}
				if (images.length) {
					images.forEach((img) => {
						queue.push(ImageCache.queueImage(img));
					});
				}
			});
			Promise.allSettled(queue).then((results) => {
				results.forEach((result) => {
					if (result.status != 'fulfilled') {
						console.warn('Failed to load resource.');
					}
				});
				resolve(this);
			});
		});
	}

	static registerShape(name, shape) {
		return Renderer.registerShape(name, shape);
	}

	removeShape(shape) {
		this.#shapes.delete(shape);
		return this;
	}

	resetTransform() {
		this.#transform = new DOMMatrix();
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
	 * @param {number} deg Angle in degrees.
	 * @returns {this}
	 */
	rotate(deg) {
		this.#transform = Renderer.rotate(deg, this.#transform);
		return this;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {this}
	 */
	scale(x, y) {
		this.#transform = Renderer.scale(x, y, this.#transform);
		return this;
	}

	setShapes(shapes) {
		this.#shapes.clear();
		this.addShapes(shapes);
		return this;
	}

	/**
	 * @param {DOMMatrix} t
	 */
	setTransform(t) {
		if (isAffineMatrix(t)) {
			this.#transform = t;
		}
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
		this.forEach((shape) => {
			if (this.isPointInShape(x, y, shape, includeHidden)) {
				hit.push(shape);
			}
		});

		hit.reverse();
		var [first] = hit;
		return first;
	}

	/**
	 * Set render target.
	 * @param {import('./SkittleRenderer').RenderTarget | String} canvas
	 * @returns {this}
	 */
	target(canvas) {
		if (typeof canvas == 'string') {
			let el = document.querySelector(canvas);
			if (Renderer.isValidRenderTarget(el)) {
				canvas = el;
			}
		}

		if (canvas) {
			if (Renderer.isValidRenderTarget(canvas)) {
				this.#canvas = canvas;
			} else {
				console.warn('Unsupported render target provided!', canvas);
			}
		}

		return this;
	}

	toBlob(type = 'image/jpeg', quality = 0.9) {
		return new Promise((resolve, reject) => {
			if (this.#canvas instanceof HTMLCanvasElement) {
				this.#canvas.toBlob(
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
			} else if (this.#canvas instanceof OffscreenCanvas) {
				this.#canvas
					.convertToBlob({
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
	 * @param {number} quality Image quality.
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
	 * @param {number} x
	 * @param {number} y
	 * @returns {this}
	 */
	translate(x, y) {
		this.#transform = Renderer.translate(x, y, this.#transform);
		return this;
	}

	get width() {
		return this.#canvas?.width || 0;
	}
	set width(w) {
		this.#canvas.width = w;
	}

	/**
	 * Clears entire canvas, wiping it clean.
	 */
	wipe() {
		var { context } = this;
		context.clearRect(0, 0, this.width, this.height);
	}
}
