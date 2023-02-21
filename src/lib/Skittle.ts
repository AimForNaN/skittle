import ImageCache from './ImageCache';
import Image from './shapes/SkittleImage';
import Rect from './shapes/SkittleRect';
import Renderer from './SkittleRenderer';
import Shape from './shapes/SkittleShape';
import StyledShape from './shapes/SkittleStyledShape';

Renderer.registerShape('rect', Rect);
Renderer.registerShape('image', Image);

export default class Layer {
	canvas: TSkittleCanvasTarget;
	Renderer: Renderer;
	protected Shapes: Set<TSkittleAnyShape> = new Set();

	constructor(canvas?: TSkittleCanvasTarget | string) {
		this.canvas = new OffscreenCanvas(0, 0);
		this.target(canvas);

		this.Renderer = new Renderer();
	}

	addShape(shape: TSkittleAnyShape): Layer {
		this.Shapes.add(shape);
		return this;
	}

	addShapes(shapes: TSkittleAnyShape[]): Layer {
		this.Shapes = new Set([...this.Shapes, ...shapes]);
		return this;
	}

	get context(): TSkittleRenderingContext {
		return this.canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	draw(): Layer {
		this.wipe();

		var { context } = this;
		this.forEach((shape) => {
			context.save();
			this.Renderer.draw(shape, context);
			context.restore();
		});
		return this;
	}

	forEach(fn: (shape: Shape) => void): Layer {
		this.Shapes.forEach((shape) => {
			if (shape instanceof Shape) {
				fn(shape);
			} else {
				var sh = Renderer.shapeFromObject(shape);
				if (sh) {
					fn(sh);
				}
			}
		});
		return this;
	}

	get height(): number {
		return this.canvas?.height || 0;
	}

	set height(h: number) {
		this.canvas.height = h;
	}

	isPointInPath(x: number, y: number, shape: Shape): boolean {
		var layer = new Layer();
		layer.resize(this.width, this.height);

		var { context } = layer;
		var path = shape.createPath();
		this.Renderer.draw(shape, context);

		return context.isPointInPath(path, x, y);
	}

	preloadImages() {
		return new Promise<Layer>((resolve, reject) => {
			var queue: any[] = [];
			this.forEach((shape) => {
				let src = null;
				if (shape instanceof Image) {
					src = shape.src;
				} else if (shape instanceof StyledShape) {
					src = shape.image;
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

	registerShape(name: string, shape: TSkittleShapeConstructor<Shape>) {
		Renderer.registerShape(name, shape);
	}

	removeShape(shape: TSkittleAnyShape): Layer {
		this.Shapes.delete(shape);
		return this;
	}

	resize(width: number, height: number): Layer {
		this.height = height;
		this.width = width;
		return this;
	}

	setShapes(shapes: TSkittleAnyShape[]): Layer {
		this.Shapes = new Set(shapes);
		return this;
	}

	shapeAtPoint(x: number, y: number): TSkittleAnyShape | null {
		var hit: Shape[] = [];
		this.forEach((shape) => {
			if (this.isPointInPath(x, y, shape)) {
				hit.push(shape);
			}
		});
		hit.reverse();
		var [first] = hit;
		return first;
	}

	target(canvas?: TSkittleCanvasTarget | string): Layer {
		if (typeof canvas == 'string') {
			let el: any = document.querySelector(canvas);
			if (el instanceof HTMLCanvasElement) {
				canvas = el;
			}
		}

		if (canvas instanceof HTMLCanvasElement) {
			this.canvas = canvas;
		}

		return this;
	}

	toUrl(type: string = 'image/jpeg', quality: number = 0.9): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			if (this.canvas instanceof HTMLCanvasElement) {
				this.canvas.toBlob(
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
			} else if (this.canvas instanceof OffscreenCanvas) {
				this.canvas
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

	get width(): number {
		return this.canvas?.width || 0;
	}

	set width(w: number) {
		this.canvas.width = w;
	}

	wipe() {
		var { context } = this;
		context.resetTransform();
		context.clearRect(0, 0, this.width, this.height);
	}
}
