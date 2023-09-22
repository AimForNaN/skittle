---
layout: ../../layouts/doc.astro
title: Filters
---

Filters provide a modular way to make adjustments to the rendering contexts of shapes.
In this way we can inherit traits from multiple sources without the need for multiple inheritance.
Each render function dictates its own filters to be applied at draw time.
As such, filters are only relevant within the context of render functions.

Skittle provides several kinds of filters.

<<< @/src/lib/filters/index.js

They can be accessed by importing `Filters`.

```js
import { Filters } from '@truefusion/skittle';
```

All filters provided by skittle require that the first parameter be reserved for the rendering context of the canvas.
Any additional parameters would be relevant only to that filter.

```ts
function (ctx: RenderingContext);
```

## Custom filters

Filters are simply functions that make adjustments to the rendering context of the canvas.
They exist only to help keep things <abbr title="don't repeat yourself">DRY</abbr>.
No registration is required for filters.
Their use is entirely optional.
