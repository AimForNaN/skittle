---
layout: ../../layouts/doc.astro
title: Hit detection
---

Skittle provides hit-detection methods for existing shapes, arbitrary shapes and arbitrary paths.
An "existing shape" is a shape that is handled internally by a skittle instance. 
An "arbitrary shape" is a shape not internally managed by a skittle instance.
In the end, all shapes are resolved to arbitrary paths.

All shapes will be passed through a registered render function in order to obtain path information and temporarily apply any local transformations.
The overhead of a render function can be avoided if path information is calculated by some other mean (losing any local transformations).
Once path information is acquired, it can and will be used to calculate pointer interaction.

```js
// Arbitrary paths!
var hit = $skittle.isPointInPath(x, y, path);

// Arbitrary shapes!
var hit = $skittle.isPointInShape(x, y, shape);

// Existing shapes!
var shape = $skittle.shapeAtPoint(x, y);
```

:::note

Remember, since arbitrary paths do not specify transformations, *local* transformations will only apply to shapes as they are passed through render functions.
Therefore, any transformations applied to arbitrary paths will come from any already existing *global* transformations.

:::
