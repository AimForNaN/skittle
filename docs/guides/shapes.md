# Shapes

A shape in skittle is an object that contains metadata on how the shape is to be rendered.
Skittle reserves the `type` property for all shapes.
The `type` property stores what render function to be used during render time.
As such, Skittle requires the `type` property to be specified for all shapes.

```ts
interface Shape {
    type: string,
}
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
Render functions take in one parameter, which is the rendering context of the canvas.
The metadata of shapes can be accessed with `this`.
All render functions must return a [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D) object.
Path information is used for hit detection.

```ts
function (ctx?: RenderingContext): Path2D; 
```

The primary function of a render function is to return path information.
As such, the rendering context is not always provided through the context parameter.
When no context is provided, no rendering should occur.

```js
import { Registry } from '@truefusion/skittle';

Registry.set('custom', function (ctx) {
    if (ctx) {
        // Only draw when we have a rendering context!
    }
    return new Path2D();
});

$skittle.shapes.add({
	type: 'custom',
});
$skittle.draw();
```

## Dynamic shapes

It is not entirely necessary to register a new render function in order to render a shape.
Skittle supports using render functions as shapes.

```js
$skittle.shapes.add(function (ctx) {
    if (ctx) {
        // Only draw when we have a rendering context!
    }
    return new Path2D();
});
```
