---
layout: ../../layouts/doc.astro
title: Renderers
---

Since canvas elements support more than just 2D contexts, there is a need to help differentiate and manage the differing contexts.
Renderers help to fulfill this need.
They fill the role of handling drawing on the canvas, clearing the canvas, keeping track of global transformations, keeping track of canvas rendering contexts, handling path information, among other things.

Render functions are tasked with providing path information.
The path information that is returned should therefore be compatible with existing renderers.
Currently, skittle only supports a 2D renderer.
As such, [Path2D](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D) objects are used for storing path information.
For 3D contexts and custom renderers, custom path information may be returned from custom render functions.

Each skittle instance is supplied with its own renderer, accessible from the `renderer` property.


```js
const { renderer } = $skittle;
```

It is possible to specify a different renderer through the constructor.

```js
const $skittle = new Layer(canvas, renderer);
```

## Custom renderers

All renderers must inherit from the `Renderer` abstract class.

```js
import { Renderer } from '@truefusion/skittle';

class CustomRenderer extends Renderer {
    // Implement abstract methods and properties!
}
```
