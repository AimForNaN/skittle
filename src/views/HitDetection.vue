<script setup>
	import { onMounted, reactive, ref } from 'vue';
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
	const ghost = {
		type: 'rect',
		x: 0,
		y: 0,
		width: 200,
		height: 200,
		style: {
			border: '1 solid blue',
		},
	};
	const rects = [
		{
			type: 'rect',
			x: 0,
			y: 0,
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

	onMounted(() => {
		onMouseDown({
			offsetX: 0,
			offsetY: 0,
		});
	});
</script>

<template>
	<Canvas :x="100" :y="100" ref="$canvas">
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
	<Canvas ref="$hitCanvas" @mousedown="onMouseDown">
		<Shape :config="ghost"></Shape>
		<Shape :config="hit"></Shape>
	</Canvas>
</template>
