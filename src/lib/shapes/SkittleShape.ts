export default abstract class SkittleShape {
	abstract createPath(): Path2D;
	abstract draw(ctx: TSkittleRenderingContext): void;

	static fromObject(shape: TSkittleShape): SkittleShape | null {
		return null;
	}
}