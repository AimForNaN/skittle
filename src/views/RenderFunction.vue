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
			ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#FF000088';
			ctx.fill();
		}
	}
	function onMousemove(e) {
		pos.x = e.offsetX;
		pos.y = e.offsetY;

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
