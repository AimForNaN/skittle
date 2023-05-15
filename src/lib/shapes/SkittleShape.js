export default class Shape {
	#visible = true;

	createPath() {}
	draw(ctx) {}

	static fromObject(shape) {
		return null;
	}

	get visible() {
		return this.#visible;
	}

	set visible(v) {
		this.#visible = Boolean(v);
	}
}
