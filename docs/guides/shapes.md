# Shapes

A shape represents a pre-defined object to be drawn onto the canvas.
All shapes must be registered with skittle in order to trigger the rendering of the shape.
The name of the shape is provided upon registration.
The name of the shape also represents its type.
Once registered, a shape can be referenced according to its type.

Currently, only the following shapes are supported:

<<< @/../src/lib/shapes/index.js


Any other shapes will have to be created through skittle's API.

## Creating custom shapes

All shapes must extend from the `Shape` class and implement the `createPath` method.
The `createPath` method must return a `Path2D` instance.

::: code-group
```js [custom-shape.js]
import { Shape } from '@truefusion/skittle';

export default class CustomShape extends Shape {
	constructor(obj) {
		super();
		// Handle obj...
	}

	createPath() {
		var path = new Path2D();
		// Create path...
		return path;
	}
}
```
:::

::: info NOTE
The `createPath` method is also used for hit detection.
:::

## Registering a shape

All shape definitions are registered through the `Renderer` class.

```js
import { Renderer } from '@truefusion/skittle';
import CustomShape from './custom-shape.js';

Renderer.registerShape('custom', CustomShape);
```

From that point on, skittle can match a shape's type to the registered name.

```js
import { Layer } from '@truefusion/skittle';

const $skittle = new Layer();
$skittle.addShape({
	type: 'custom',
}).draw();
```

## Render functions

It is not entirely necessary to register a new shape in order to render a custom shape.
Skittle supports the dynamic rendering of shapes through render functions.

```js
$skittle.addShape(function (ctx, obj) {
	if (Renderer.isValidRenderingContext(ctx)) {
		// Render shape...
	}
}).draw();
```

:::warning
Render functions lack hit-detection support!
:::

### Registering render functions

Skittle gives you the option to register render functions as shapes.
Let us modify the previous example.

```js
Renderer.registerShape('custom', function (ctx, obj) {
	if (Renderer.isValidRenderingContext(ctx)) {
		// Render shape...
	}
});

$skittle.addShape({
	type: 'custom',
	// Other properties...
}).draw();
```