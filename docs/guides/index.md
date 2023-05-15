# Getting started

Skittle is an API-agnostic, HTML5-canvas library inspired by [origami.js](https://raphamorim.io/origamijs/). Due to a lack of complete browser support for the [CSS Typed Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model#css_typed_object_model_experimental) (Firefox, I'm looking at you), CSS-compatible styling will be placed on hold for a future release.

Skittle was formed due to the lack of unopinionated canvas libraries.
Unlike most other canvas libraries, skittle doesn't necessarily try to enforce a specification or methodology.
This makes it compatible with things like web components, and gives you the freedom to work with any HTML5 canvas on your terms.
Skittle mostly only cares about rendering.
As such, things like animations and pointer events are left in the hands of the developer.
Nevertheless, we provide basic examples on ways to deal with things like animations and hit detection.

### Why not just use origami?

Origami seems to be compatible with web components and allows for easily changing render targets.
It seems to support animations.
It seems to support custom and complex shapes.
It seems to have everything that I need and that skittle provides.
So, why not just use origami?
Simply put, I wanted a more object-oriented approach to dealing with the canvas API.
I needed exposure to deeper, underlying parts and one that I could easily extend at my choosing.
Just the right mix between high level and low level.
Skittle also doesn't require a pre-existing canvas to instantiate.
Skittle scratches my itch and floats my boat.

## Installation

::: code-group
```sh [npm]
$ npm install @truefusion/skittle --save
```
```sh [yarn]
$ yarn add @truefusion/skittle
```
:::

## Basic concept

Skittle assumes every canvas to be its own layer.
As such, every canvas is handled by the `Layer` class, each `Layer` representing one canvas or render target.
A render target is an object that provides a render context to draw on, assuming it is supported by skittle.
A render target can be specified in the `Layer`'s constructor.

```js
import * as Skittle from '@truefusion/skittle';

var canvas = document.createElement('canvas');
canvas.id = 'canvas';
document.body.appendChild(canvas);

var $skittle = new Skittle.Layer(canvas);
var $skittle = new Skittle.Layer('#canvas');
```

By default, if no other render target is specified, each layer will start off with its own [offscreen canvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas).

```js
var $skittle = new Skittle.Layer(); // Defaults to OffscreenCanvas!
```

Nevertheless, it is not necessary to construct multiple layers to handle multiple canvas elements.
After constructing a new `Layer`, you can dynamically change render targets.

```js
$skittle.target(canvas);
$skittle.target('#canvas');
```

From here you can start working with shapes and issuing `draw` commands.