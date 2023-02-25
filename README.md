# skittle

Skittle is an API-agnostic, HTML5-canvas library inspired by [origami.js](https://raphamorim.io/origamijs/).
Unlike most other canvas libraries, skittle is designed with web components in mind, giving you the freedom to work with any HTML5 canvas on your terms.
Skittle mostly only cares about rendering.
Things like animations and pointer events are left in the hands of the developer.
Nevertheless, we provide basic examples on ways to deal with things like animations and hit detection.

## Basic usage

You should consider every instance of skittle to act as a canvas `layer`.
Each instance of skittle manages its own canvas (or `layer`).
What makes skittle compatible with web component libraries is that it doesn't require the existence of a canvas to set everything up.
In fact, you can change where each instance renders to at any point in your code, and that includes an offscreen canvas.
For simplicity, we'll call these `render targets`.

```js
import Skittle from '@truefusion/skittle';

// An OffscreenCanvas is used by default. (Eat your heart out, Safari!)
const $skittle = new Skittle.Layer();

// Set size of canvas.
$skittle.resize(500, 500);

// Add a shape and draw.
$skittle.addShape({
	type: 'rect',
	x: 50,
	y: 50,
	width: 100,
	height: 100,
	style: {
		background: {
			color: 'black',
		},
	},
}).draw();

$skittle.toUrl('image/jpeg', 1).then((dataUrl) => {
	// Do something with dataUrl...
});
```

#### Changing render targets
```js
// Set render target through constructor.
const canvas = document.createElement('canvas');
const $skittle = new Skittle.Layer(canvas);

// Change render target.
$skittle.target('#canvas');
```


## Install

```sh
npm install @truefusion/skittle --save
```

## Project setup

```sh
npm install
npm run build
```
