---
layout: ../../layouts/doc.astro
title: Renderers
---

Since canvas elements support more than just 2D contexts, there is a need to help differentiate and manage the differing contexts.
Renderers help to fulfill this need.
They fill the role of handling drawing on the canvas, clearing the canvas, keeping track of global transformations, keeping track of canvas rendering contexts, handling path information, among other things.

Each skittle instance is supplied with its own renderer.
Currently, skittle only supports a 2D renderer, which is the default renderer for each skittle instance, accessible from the `renderer` property.

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
