# Shapes

A shape represents a pre-defined object to be drawn onto the canvas.
All shapes must be registered with skittle in order to trigger the rendering of the shape.
The name of the shape is provided upon registration.
The name of the shape also represents its type.
Once registered, a shape can be referenced according to its type.

## Registering a shape

All shape definitions are registered through the `Renderer` class.

```js
import { Renderer, Shape } from '@truefusion/skittle';

class Chart extends Shape {
	// Implementation...
}

Renderer.registerShape('chart', Chart);
```

From that point on, skittle can match a shape's type to the registered name.

```js
import { Layer } from '@truefusion/skittle';

const $skittle = new Layer();
$skittle.addShape({
	type: 'chart',
	// Shape-specific properties...
}).draw();
```

## Render functions

It is not entirely necessary to register a new shape in order to render a custom shape.
Skittle supports the dynamic rendering of shapes through render functions.

```js
$skittle.addShape(function (ctx) {
	if (Renderer.isValidRenderingContext(ctx)) {
		ctx.beginPath();
		ctx.arc(100, 100, 10, 0, Math.PI * 2);
		ctx.stroke();
	}
});
```

:::warning
Render functions lack hit-detection support!
:::