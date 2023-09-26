---
layout: ../../layouts/doc.astro
title: Shapes
---

A shape in skittle is an object that contains metadata on how the shape is to be rendered.
By default, skittle reserves the `type` property for all shapes.
The `type` property stores what render function to be used during render time.
As such, unless otherwise specified, skittle requires the `type` property to be specified for all shapes.

```ts
interface Shape {
    type: string,
}
```

This can be changed by adjusting the static `key` property for `Layer`.

```js
import { Layer } from '@truefusion/skittle';

Layer.key = 'name'; // defaults to 'type'!

$skittle.shapes.add({
    name: 'rect',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
});
```

## Rendering shapes 

Skittle uses render functions to render shapes.
Currently, skittle only provides a few render functions.

<<< @/src/lib/shapes/index.js

They can be accessed by importing `Shapes`:

```js
import { Shapes } from '@truefusion/skittle';

const shape = {
    type: 'rect',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
};
Shapes.Rect.call(shape, $skittle.context);
```

:::note
Until more render functions are implemented, any other render functions will have to be created yourself. 
:::

## Custom render functions

Render functions take in one parameter, the rendering context of the canvas.
The metadata of shapes can be accessed with `this`.

```ts
function (ctx: RenderingContext); 
```

The renderer handles saving and restoring context state so that shapes won't interfere with the rendering of other shapes.
As such, render functions normally do not need to worry about context state.
Context state will be saved before render and restored after render.

```js
import { Registry, Renderer2d } from '@truefusion/skittle';

Registry.set('custom', function (ctx) {
    if (Renderer2d.isValidRenderingContext(ctx)) {
        // Do some drawing...
    }
});

$skittle.shapes.add({
	type: 'custom',
});
$skittle.draw();
```

## Dynamic shapes

It is not entirely necessary to register a new render function in order to render a custom shape.
Skittle supports using render functions as shapes.

```js
$skittle.shapes.add(function (ctx) {
    if (Renderer2d.isValidRenderingContext(ctx)) {
        // Do some rendering...
    }
});
```
