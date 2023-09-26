---
layout: ../../layouts/doc.astro
title: Renderers
---

Since canvas elements support more than just 2D contexts, there is a need to help differentiate and manage the differing contexts.
Renderers help to fulfill this need.
They fill the role of handling drawing on the canvas, clearing the canvas, keeping track of global transformations, keeping track of canvas rendering contexts, handling path information, transformations, among other things.
Currently, skittle only supports a 2D renderer.

Each skittle instance is supplied with its own renderer, accessible from the `renderer` property.


```js
const { renderer } = $skittle;
```

It is possible to specify a different renderer through the constructor.

```ts
const $skittle = new Layer(canvas as HTMLCanvasElement, renderer as Renderer);
```

## Custom renderers

All renderers must inherit from the `Renderer` abstract class and implement any missing functionality.

```js
import { Renderer } from '@truefusion/skittle';

class CustomRenderer extends Renderer {
    // Implement abstract methods and properties!
}
```
