---
layout: ../layouts/home.astro
---

```js
import * as Skittle from '@truefusion/skittle';

var $skittle = new Skittle.Layer();

$skittle.shapes.add({
	type: 'rect',
	x: 0,
	y: 0,
	width: 100,
	height: 100,
});

$skittle.draw();
```
