---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Skittle
  text: API-agnostic, canvas library
  tagline: Simple and unopinionated.
  actions:
    - theme: brand
      text: Getting started
      link: /guides/

features:
  - title: API agnostic
    details: Plays nice with just about anything.
  - title: Freedom
    details: Only manages rendering. The rest is up to you.
  - title: Extensible
    details: Object-oriented design.
---

<div class="vp-doc">
<div class="index-content">
<div class="container">

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

</div>
</div>
</div>

<style>
	.index-content {
		margin-top: 4rem;
		position: relative;
		padding: 0 24px;
	}

	@media (min-width: 640px) {
		.index-content {
			padding: 0 48px;
		}
	}

	@media (min-width: 960px) {
		.index-content {
			padding: 0 64px;
		}
	}

	.container {
		margin: 0 auto;
		max-width: 1152px;
	}
</style>
