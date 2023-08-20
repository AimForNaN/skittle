# Transformations

The `Style` provides basic support for affine transformations.
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
	scale: number | number[] | Point,
	translate: Point | number[],
	origin: Point | number[],
}

interface StyledShape {
	style: {
		transform: Transform,
	},
}
```

```js
import * as Skittle from '@truefusion/skittle';

var $skittle = new Skittle.Layer();

$skittle.shapes.add({
	type: 'rect',
	x: 0,
	y: 0,
	height: 100,
	width: 100,
	style: {
		transform: {
			rotate: 45,
			scale: 0.5,
			translate: {
				x: 100,
				y: 100,
			},
		},
	},
});
```

:::info NOTE
If you want to support a different transformation order or a different interface, you'll have to define your own render function. 
:::
