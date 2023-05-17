# Transformations

`StyledShape` provides basic support for affine transformations.
By default, scale (S), rotation (R) and translate (T) and origin are supported.
Rotations are measured in degrees.
Transformations are done in **TRS** order.
Transformations are supplied in the `transform` property under the `style` property.

```ts
type Point {
	x: number,
	y: number,
}

type Transform {
	rotate: number,
	scale: number | Point | Array<number>,
	translate: Point,
	origin: Point,
}

interface StyledShape {
	style: {
		transform: Transform,
	},
}
```

:::info NOTE
If you want to support a different transformation order or a different interface, you'll have to register your own shape.
:::

## Custom shapes

It is not safe to assume that all shapes have the same, basic setup.
As such, `StyledShape` does not provide *x* and *y* coordinates.
For shapes that provide their own coordinates, it is necessary to override certain methods.
At the very least, `normalizeTransform` should be overridden.

```js
import { Renderer, StyledShape } from '@truefusion/skittle';

class CustomShape extends StyledShape {
	constructor(style) {
		super();
		this.setStyle(style);
	}

	normalizeTransform(transform) {
		var t = [
			super.normalizeTransform(transform),
			Renderer.translate(this.x, this.y),
		];

		return Renderer.transform(...t);
	}
}
```