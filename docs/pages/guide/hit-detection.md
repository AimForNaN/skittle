---
layout: ../../layouts/doc.astro
title: Hit detection
---

Skittle provides hit-detection methods for existing shapes and arbitrary shapes.
All shapes will be passed through a registered render function in order to apply any path information and any local transformations.
Global transformations will also be applied prior to checking.

```js
// Arbitrary shapes!
var hit = $skittle.isPointInShape(x, y, shape);

// Existing shapes!
var shape = $skittle.shapeAtPoint(x, y);
```
