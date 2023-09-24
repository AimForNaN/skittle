---
layout: ../../layouts/doc.astro
title: Hit detection
---

Skittle provides hit-detection methods for existing shapes and arbitrary shapes.
In the end, all shapes are resolved to arbitrary paths.
All shapes will be passed through a registered render function in order to obtain path information and temporarily apply any local transformations.
Global transformations will also be applied prior to checking.

```js
// Arbitrary shapes!
var hit = $skittle.isPointInShape(x, y, shape);

// Existing shapes!
var shape = $skittle.shapeAtPoint(x, y);
```
