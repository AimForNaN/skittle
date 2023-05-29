# Filters

Filters provide a modular way to make adjustments to the rendering contexts of shapes.
Each shape can register its own filters to be applied at draw time, but they are not mandatory.

Skittle provides several kinds of filters.

<<< @/../src/lib/filters/index.js

## Creating filters

All filters must extend from the `Filter` class and implement the `apply` method.

```js
import { Filter } from '@truefusion/skittle';

class CustomFilter extends Filter {
	apply(ctx, shape) {
	}
}
```

## Using filters

All shapes that extend from `Shape` can use the `use` method to register filters to itself.

```js
import { Shape } from '@truefusion/skittle'; // [!code --]
import { Filters, Shape } from '@truefusion/skittle'; // [!code ++]
const { FillFilter, StrokeFilter, StyleFilter } = Filters; // [!code ++]

export default class CustomShape extends Shape {
	constructor(obj) {
		super();
		// Handle obj...

		this.use( // [!code ++]
			new StyleFilter(obj), // [!code ++]
			new FillFilter(), // [!code ++]
			new StrokeFilter() // [!code ++]
		); // [!code ++]
	}
}
```

If you desire to work without filters, you will have to override the `draw` method and draw the shape manually.
Albeit, filters can still be used even then.

```js
import { Filters, Shape } from '@truefusion/skittle'; // [!code --]
import { Shape } from '@truefusion/skittle'; // [!code ++]
const { FillFilter, StrokeFilter, StyleFilter } = Filters; // [!code --]

export default class CustomShape extends Shape {
	constructor(obj) {
		super();
		// Handle obj...
		// [!code --]
		this.use( // [!code --]
			new StyleFilter(obj), // [!code --]
			new FillFilter(), // [!code --]
			new StrokeFilter() // [!code --]
		); // [!code --]
	}

	draw(ctx) { // [!code ++]
		// Draw shape... // [!code ++]
	} // [!code ++]
}
```

::: info NOTE
Remember, hit-detection support requires returning a `Path2D` instance from `createPath`. Nevertheless, it is not required to use `createPath` to render the shape.
:::