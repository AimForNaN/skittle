<script setup>
	import { ref, unref } from 'vue';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';
	import { Registry, Renderer2d } from "../plugin";

	const $canvas = ref(null);
	const shape = {
		type: 'render-function',
		x: 0,
		y: 0,
	};

	function onMousemove(e) {
		shape.x = e.offsetX;
		shape.y = e.offsetY;

		var canvas = unref($canvas);
		if (canvas) {
			canvas.draw();
		}
	}

	Registry.set('render-function', function (ctx) {
		var path = new Path2D();
		path.arc(this.x, this.y, 20, 0, 2 * Math.PI, false);

		if (Renderer2d.isValidRenderingContext(ctx)) {
			ctx.fillStyle = '#FF000088';
			ctx.fill(path);
		}

		return path;
	});
</script>

<template>
	<Canvas ref="$canvas" @mousemove="onMousemove">
		<Shape :config="shape"></Shape>
	</Canvas>
</template>
