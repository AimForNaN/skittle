import ImageCache from './ImageCache';
import SkittleImage from './shapes/SkittleImage';
import SkittleRect from './shapes/SkittleRect';
import SkittleRenderer from './SkittleRenderer';
import SkittleShape from './shapes/SkittleShape';
import SkittleStyledShape from './shapes/SkittleStyledShape';

SkittleRenderer.registerShape('rect', SkittleRect);
SkittleRenderer.registerShape('image', SkittleImage);

export default class Skittle {
	canvas: TSkittleCanvasTarget;
	Renderer: SkittleRenderer;
	protected Shapes: Set<TSkittleAnyShape> = new Set();

	constructor(canvas?: TSkittleCanvasTarget | string) {
		this.canvas = new OffscreenCanvas(0, 0);
		this.target(canvas);

		this.Renderer = new SkittleRenderer(this);
	}

	addShape(shape: TSkittleAnyShape): Skittle {
		this.Shapes.add(shape);
		return this;
	}

	addShapes(shapes: TSkittleAnyShape[]): Skittle {
		this.Shapes = new Set([...this.Shapes, ...shapes]);
		return this;
	}

	draw(ctx?: TSkittleRenderingContext): Skittle {
		this.Renderer.draw(ctx);
		return this;
	}

	forEach(fn: (shape: SkittleShape) => void): Skittle {
		this.Shapes.forEach((shape) => {
			if (shape instanceof SkittleShape) {
				fn(shape);
			} else {
				var sh = SkittleRenderer.shapeFromObject(shape);
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

	isPointInPath(x: number, y: number, shape: TSkittleAnyShape): boolean {
		var sk = new Skittle();
		sk.resize(this.width, this.height);
		var skShape = SkittleRenderer.shapeFromObject(shape);
		if (skShape) {
			let path = skShape.createPath();
			skShape.draw(sk.Renderer.context);
			return sk.Renderer.context.isPointInPath(path, x, y);
		}
		return false;
	}

	preloadImages() {
		return new Promise<Skittle>((resolve, reject) => {
			var queue: any[] = [];
			this.forEach((shape) => {
				let src = null;
				if (shape instanceof SkittleImage) {
					src = shape.src;
				} else if (shape instanceof SkittleStyledShape) {
					src = SkittleStyledShape.getImage(shape);
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

	registerShape(name: string, shape: TSkittleShapeConstructor<SkittleShape>) {
		SkittleRenderer.registerShape(name, shape);
	}

	removeShape(shape: TSkittleAnyShape): Skittle {
		this.Shapes.delete(shape);
		return this;
	}

	resize(width: number, height: number): Skittle {
		this.height = height;
		this.width = width;
		return this;
	}

	setShapes(shapes: TSkittleAnyShape[]): Skittle {
		this.Shapes = new Set(shapes);
		return this;
	}

	shapeAtPoint(x: number, y: number): TSkittleAnyShape | null {
		var shapes = Array.from(this.Shapes.values());
		shapes.reverse();
		for (let shape of shapes) {
			if (this.isPointInPath(x, y, shape)) {
				return shape;
			}
		}
		return null;
	}

	target(canvas?: TSkittleCanvasTarget | string): Skittle {
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
				this.canvas.toBlob((blob) => {
					if (blob) {
						var obj = URL.createObjectURL(blob);
						resolve(obj);
						URL.revokeObjectURL(obj);
					} else {
						reject('Failed to convert to blob!');
					}
				}, type, quality);
			} else if (this.canvas instanceof OffscreenCanvas) {
				this.canvas.convertToBlob({
					type,
					quality,
				}).then((blob) => {
					var obj = URL.createObjectURL(blob);
					resolve(obj);
					URL.revokeObjectURL(obj);
				}).catch(reject);
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
}
