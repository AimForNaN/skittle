# Shapes

A shape represents a pre-defined object to be drawn onto the canvas.
All shapes must be registered with skittle in order to trigger the rendering of the shape.
The name of the shape is provided upon registration.
The name of the shape also represents its type.
Once registered, a shape can be referenced according to its type.

Currently, only the following shapes are supported:
 - Rect
 - Image

## Creating custom shapes

Shapes can either extend from `Shape` or `StyledShape`.
`StyledShape` conveniently provides basic styling options to your shape.

::: code-group
```js [circle.js]
import { StyledShape } from '@truefusion/skittle';

export default class Circle extends StyledShape {
	x;
	y;
	radius;

	constructor(x, y, radius, style) {
		super(style);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	createPath() {
		var path = new Path2D();
		path.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		return path;
	}

	static fromObject(obj) {
		return new Circle(obj.x, obj.y, obj.radius, obj.style);
	}
}
```
:::

## Registering a shape

All shape definitions are registered through the `Renderer` class.

```js
import { Renderer } from '@truefusion/skittle';
import Circle from './circle.js';

Renderer.registerShape('circle', Circle);
```

From that point on, skittle can match a shape's type to the registered name.

```js
import { Layer } from '@truefusion/skittle';

const $skittle = new Layer();
$skittle.addShape({
	type: 'circle',
	x: 100,
	y: 100,
	radius: 10,
	style: {
		background: {
			color: 'crimson',
		},
		border: {
			color: 'red',
			width: 1,
		},
	},
}).draw();
```

## Render functions

It is not entirely necessary to register a new shape in order to render a custom shape.
Skittle supports the dynamic rendering of shapes through render functions.

```js
$skittle.addShape(function (ctx) {
	if (Renderer.isValidRenderingContext(ctx)) {
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(100, 100, 20, 0, Math.PI * 2);
		ctx.stroke();
	}
}).draw();
```

:::warning
Render functions lack hit-detection support!
:::