# Filters

Filters provide a modular way to make adjustments to the rendering contexts of shapes.
Each shape registers its own filters to be applied at draw time.
Skittle provides several kinds of filters.

<<< @/../src/lib/filters/index.js

## Creating filters

All filters must extend from the `Filter` class and implement the `apply` method.

```js
import { Filters } from '@truefusion/skittle';
const { Filter } = Filters;

class CustomFilter extends Filter {
	apply(ctx, shape) {
	}
}
```

## Using filters

All shapes that extend from `Shape` can use the `use` method to register filters to itself.

```js
import { Filters, Shapes } from '@truefusion/skittle';
const { FillFilter, StrokeFilter, StyleFilter } = Filters; // [!code ++]
const { Shape } = Shapes;

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