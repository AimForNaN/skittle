import ImageCache from './ImageCache';
import Image from './shapes/SkittleImage';
import Rect from './shapes/SkittleRect';
import Renderer from './SkittleRenderer';
import StyledShape from './shapes/SkittleStyledShape';
import { isAffineMatrix } from 'transformation-matrix';

Renderer.registerShape('rect', Rect);
Renderer.registerShape('image', Image);

export default class Layer {
	#canvas;
	#shapes = new Set();
	#transform = new DOMMatrix();

	/**
	 * @param {import('./SkittleRenderer').RenderTarget | String} canvas
	 */
	constructor(canvas) {
		this.#canvas = new OffscreenCanvas(0, 0);
		this.target(canvas);
	}

	/**
	 * @param {Object} shape
	 * @returns {this}
	 */
	addShape(shape) {
		if (Renderer.isValidShape(shape)) {
			if (!shape.hasOwnProperty('visible')) {
				shape.visible = true;
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

	isPointInShape(x, y, shape) {
		var layer = new Layer();
		layer.resize(this.width, this.height);

		var { context } = layer;
		var sh = Renderer.shapeFromObject(shape);
		if (sh) {
			Renderer.draw(sh, context, this.#transform);
			return context.isPointInPath(sh.createPath(), x, y);
		}

		return false;
	}

	mapPointToCanvas(x, y) {
		return Renderer.transformPoint(x, y, this.#transform);
	}

	/**
	 * Load all images from all shapes and store them to cache.
	 * @returns {Promise}
	 */
	preloadImages() {
		return new Promise((resolve, reject) => {
			var queue = [];
			this.forEach((shape) => {
				let src = null;
				let sh = Renderer.shapeFromObject(shape);
				if (sh) {
					if (sh instanceof Image) {
						src = sh.src;
					} else if (sh instanceof StyledShape) {
						src = sh.image;
					}
				}
				if (src) {
					queue.push(ImageCache.queueImage(src));
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
	 * @returns {Shape}
	 */
	shapeAtPoint(x, y) {
		var hit = [];
		this.forEach((shape) => {
			if (this.isPointInShape(x, y, shape)) {
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

	toUrl(type = 'image/jpeg', quality = 0.9) {
		return new Promise((resolve, reject) => {
			if (this.#canvas instanceof HTMLCanvasElement) {
				this.#canvas.toBlob(
					(blob) => {
						if (blob) {
							var obj = URL.createObjectURL(blob);
							resolve(obj);
							URL.revokeObjectURL(obj);
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
						var obj = URL.createObjectURL(blob);
						resolve(obj);
						URL.revokeObjectURL(obj);
					})
					.catch(reject);
			} else {
				reject('Unsupported canvas!');
			}
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
