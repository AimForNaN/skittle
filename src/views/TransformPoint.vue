<script setup>
	import { ref, unref } from 'vue';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';

	const $canvas = ref(null);
	const cursor = {
		type: 'rect',
		x: 0,
		y: 0,
		width: 10,
		height: 10,
		style: {
			background: {
				color: 'red',
			},
		},
	};
	const rect = {
		type: 'rect',
		x: 100,
		y: 100,
		width: 200,
		height: 200,
		style: {
			background: {
				color: 'black',
			},
		},
	};

	function onMousemove(e) {
		var { offsetX, offsetY } = e;
		var canvas = unref($canvas);
		if (canvas) {
			let p = canvas.stage.transformPoint(offsetX, offsetY);
			cursor.x = p.x;
			cursor.y = p.y;
			canvas.draw();
		}
	}
</script>

<template>
	<Canvas :scale="0.5" ref="$canvas" @mousemove="onMousemove">
		<Shape :config="rect"></Shape>
		<Shape :config="cursor"></Shape>
	</Canvas>
</template>
