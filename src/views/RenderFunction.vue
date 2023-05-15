<script setup>
	import { ref, unref } from 'vue';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';
	import { Renderer } from "../plugin";

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

	Renderer.registerShape('render-function', function (ctx, obj) {
		if (Renderer.isValidRenderingContext(ctx)) {
			ctx.beginPath();
			ctx.arc(obj.x, obj.y, 20, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#FF000088';
			ctx.fill();
		}
	});
</script>

<template>
	<Canvas ref="$canvas" @mousemove="onMousemove">
		<Shape :config="shape"></Shape>
	</Canvas>
</template>
