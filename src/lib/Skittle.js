import ImageCache from './ImageCache.js';
import Image from './shapes/SkittleImage.js';
import Rect from './shapes/SkittleRect.js';
import Renderer from './SkittleRenderer.js';
import StyledShape from './shapes/SkittleStyledShape.js';

Renderer.registerShape('rect', Rect);
Renderer.registerShape('image', Image);

export default class Layer {
	#canvas;
	Renderer;
	#Shapes = new Set();

	constructor(canvas) {
		this.#canvas = new OffscreenCanvas(0, 0);
		this.target(canvas);

		this.Renderer = new Renderer();
	}

	addShape(shape) {
		if (Renderer.isValidShape(shape)) {
			if (typeof shape.visible == 'undefined') {
				shape.visible = true;
			}
			this.#Shapes.add(shape);
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
					this.Renderer.draw(sh, context);
					context.restore();
				} else {
					console.warn('Unsupported shape!', shape);
				}
			}
		});
		return this;
	}

	forEach(fn) {
		this.#Shapes.forEach(fn);
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
			this.Renderer.draw(sh, context);
			return context.isPointInPath(sh.createPath(), x, y);
		}

		return false;
	}

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
		Renderer.registerShape(name, shape);
	}

	removeShape(shape) {
		this.#Shapes.delete(shape);
		return this;
	}

	resize(width, height) {
		this.height = height;
		this.width = width;
		return this;
	}

	setShapes(shapes) {
		this.#Shapes.clear();
		this.addShapes(shapes);
		return this;
	}

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

	transformPoint(x, y) {
		return this.Renderer.transformPoint(x, y);
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

	get width() {
		return this.#canvas?.width || 0;
	}

	set width(w) {
		this.#canvas.width = w;
	}

	wipe() {
		var { context } = this;
		context.clearRect(0, 0, this.width, this.height);
	}
}
