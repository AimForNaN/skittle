# Getting started

Skittle is an API-agnostic, HTML5-canvas library inspired by [origami.js](https://raphamorim.io/origamijs/). Due to a lack of complete browser support for the [CSS Typed Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model#css_typed_object_model_experimental) (Firefox, I'm looking at you), CSS-compatible styling will be placed on hold for a future release.

Skittle was formed due to the lack of unopinionated canvas libraries.
Unlike most other canvas libraries, skittle doesn't necessarily try to enforce a specification or methodology.
This makes it compatible with things like web components, and gives you the freedom to work with any HTML5 canvas on your terms.
Skittle mostly only cares about rendering.
As such, things like animations and pointer events are left in the hands of the developer.
Nevertheless, we provide basic examples on ways to deal with things like animations and hit detection.

### Differences between origami

| Feature | skittle | origami |
|---|---|---|
| ES6 module | :white_check_mark: | :x: |
| CommonJS module | :white_check_mark: | :x: |
| Object-oriented | :white_check_mark: | :x: |
| Easily extendable | :white_check_mark: | :x: |
| CSS notation | :x: | :white_check_mark: |
| Custom shapes | :white_check_mark: | :white_check_mark: |
| Web components compatible | :white_check_mark: | :white_check_mark: |
| Supports animations | :white_check_mark: | :white_check_mark: |
| Constructor requires existing canvas | :x: | :white_check_mark: |
| Affine transformations | :white_check_mark: | :white_check_mark: |
| Composite operations | :x: | :white_check_mark: |

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