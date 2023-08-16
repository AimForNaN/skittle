export default function (ctx, path) {
	if (path instanceof Path2D) {
		ctx.fill(path);
	}
}
