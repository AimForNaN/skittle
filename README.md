# skittle

Skittle is an API-agnostic, HTML5-canvas library inspired by [origami.js](https://github.com/raphamorim/origami.js).
Unlike most other canvas libraries, skittle is designed with web components in mind, giving you the freedom to work with any HTML5 canvas on your terms.
Skittle mostly only cares about rendering.
Things like animations and pointer events are left in the hands of the developer.
Nevertheless, we provide basic examples on ways to deal with things like animations and hit detection.

```js
import * as Skittle from '@truefusion/skittle';

var $skittle = new Skittle.Layer();

$skittle.addShape({
	type: 'rect',
	x: 0,
	y: 0,
	width: 100,
	height: 100,
});

$skittle.draw();
```

### Install

```sh
npm install @truefusion/skittle --save
```

### Project setup

```sh
npm install
npm run build
```
