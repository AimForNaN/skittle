import ImageCache from '../ImageCache';
import SkittleRect from './SkittleRect';
import type SkittleStyledShape from './SkittleStyledShape';

export default class SkittleImage extends SkittleRect {
	src: string;

	constructor(
		src: string,
		x: number,
		y: number,
		width: number,
		height: number,
		style: ISkittleStyle
	) {
		super(x, y, width, height, style);
		this.src = src;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		var path = this.createPath();
		this.applyStyle(ctx);
		ctx.fill(path);

		var img = ImageCache.get(this.src);
		if (img) {
			ctx.drawImage(img, 0, 0, this.width, this.height);
		}

		SkittleImage.clearShadow(ctx);
		ctx.stroke(path);
	}

	fromObject(shape: TSkittleShape): SkittleStyledShape | null {
		if (shape.type == 'image') {
			return new SkittleImage(
				shape.src,
				shape.x,
				shape.y,
				shape.width,
				shape.height,
				shape.style
			);
		}
		return null;
	}
}
