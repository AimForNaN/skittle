<script setup>
	import { onMounted, reactive, ref } from 'vue';
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const $canvas = ref(null);
	const $hitCanvas = ref(null);
	const hit = {
		type: 'circle',
		x: 0,
		y: 0,
		radius: 5,
		style: {
			background: {
				color: 'red',
			},
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
				background: {
					color: 'black',
				},
				transform: {
					origin: 'center',
					rotate: 45,
				},
			},
		},
	];

	function onMouseDown(e) {
		var stage = $canvas.value.stage;
		var shape = stage.shapeAtPoint(e.offsetX, e.offsetY);
		hit.x = e.offsetX;
		hit.y = e.offsetY;
		hit.style.background.color = shape ? 'cyan' : 'red';
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
		<Shape :config="hit"></Shape>
	</Canvas>
</template>
