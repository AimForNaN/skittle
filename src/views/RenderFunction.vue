<script setup>
	import { ref, unref } from 'vue';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';

	const $canvas = ref(null);
	const pos = {
		x: 0,
		y: 0,
	};

	function renderFunc(ctx) {
		if (ctx instanceof CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'black';
			ctx.fill();
		}
	}
	function onMousemove(e) {
		var {
			offsetX,
			offsetY,
		} = e;

		pos.x = offsetX;
		pos.y = offsetY;

		var canvas = unref($canvas);
		if (canvas) {
			canvas.draw();
		}
	}
</script>

<template>
	<Canvas ref="$canvas" @mousemove="onMousemove">
		<Shape :config="renderFunc"></Shape>
	</Canvas>
</template>
