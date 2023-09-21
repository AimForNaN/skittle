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

Layer.key = 'name';
```

## Rendering shapes 

Skittle uses render functions to render shapes.
Currently, skittle only provides a few render functions.

<<< @/../src/lib/shapes/index.js

They can be accessed by importing `Shapes`:

```js
import { Shapes } from '@truefusion/skittle';
```

In the meantime, any other render functions will have to be created yourself. 

## Custom render functions

Skittle gives you the option to register new render functions.
Render functions take in one parameter that provides basic context information.
The metadata of shapes can be accessed with `this`.
All render functions must return path information (e.g. [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D)).
Path information is also used for hit detection.

```ts
interface Context {
    ctx: RenderingContext,
    draw: boolean,
}

function (ctx: Context): Path; 
```

The primary function of a render function is to return path information.
This may seem counter-intuitive, but the type of path information returned should be relevant to the rendering context provided. 

```js
import { Registry, Renderer2d } from '@truefusion/skittle';

Registry.set('custom', function ({ ctx, draw }) {
    if (Renderer2d.isValidRenderingContext(ctx)) {
        let path = new Path2D();

        if (draw) {
            if (this.type == 'custom') {
                // Do some drawing...
            }
        }

        return path;
    }
});

$skittle.shapes.add({
	type: 'custom',
});
$skittle.draw();
```

## Dynamic shapes

It is not entirely necessary to register a new render function in order to render a shape.
Skittle supports using render functions as shapes.
In either case, path information must be returned.

```js
$skittle.shapes.add(function ({ ctx }) {
    if (Renderer2d.isValidRenderingContext(ctx)) {
        return new Path2D();
    }
});
```
