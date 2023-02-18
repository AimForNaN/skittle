<script setup>
	import { reactive, ref } from 'vue';
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const $canvas = ref(null);
	const $hitCanvas = ref(null);
	const hit = {
		type: 'rect',
		x: 0,
		y: 0,
		width: 10,
		height: 10,
		style: {
			background: 'red',
		},
	};
	const rects = [
		{
			type: 'rect',
			x: 50,
			y: 50,
			width: 200,
			height: 200,
			style: {
				background: 'black',
				transform: 'rotate(45deg)',
				transformOrigin: 'center',
			},
		},
	];

	function onMouseDown(e) {
		var stage = $canvas.value.stage;
		var shape = stage.shapeAtPoint(e.offsetX, e.offsetY);
		hit.x = e.offsetX - 5;
		hit.y = e.offsetY - 5;
		hit.style.background = shape ? 'cyan' : 'red';
		$hitCanvas.value.draw();
	}
</script>

<template>
	<Canvas ref="$canvas">
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
	<Canvas ref="$hitCanvas" @mousedown="onMouseDown">
		<Shape :config="hit"></Shape>
	</Canvas>
</template>
