# Filters

Filters provide a modular way to make adjustments to the rendering contexts of shapes.
In this way we can inherit traits from multiple sources without the need for multiple inheritance.
Each render function dictates its own filters to be applied at draw time.

Skittle provides several kinds of filters.

<<< @/../src/lib/filters/index.js

They can be accessed by importing `Filters`.

```js
import { Filters } from '@truefusion/skittle';
```

## Custom filters

Filters are simply functions that make adjustments to the rendering context of the canvas.
All filters require that the first parameter be reserved for the rendering context of the canvas.
Any additional parameters are left up to the developer.
No registration is required for filters.

```ts
function (ctx: RenderingContext);
```
