export default abstract class Shape {
	abstract createPath(): Path2D;
	abstract draw(ctx: TSkittleRenderingContext): void;

	static fromObject(shape: TSkittleShape): Shape | null {
		return null;
	}
}
