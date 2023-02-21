import ImageCache from '../ImageCache';
import Rect from './SkittleRect';
import type StyledShape from './SkittleStyledShape';

export default class Image extends Rect {
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
		ctx.fill(path);

		var img = ImageCache.get(this.src);
		if (img) {
			ctx.drawImage(img, 0, 0, this.width, this.height);
		}

		Image.clearShadow(ctx);
		ctx.stroke(path);
	}

	fromObject(shape: TSkittleShape): StyledShape | null {
		if (shape.type == 'image') {
			return new Image(
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
