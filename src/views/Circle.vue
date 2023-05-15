<script setup>
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const circle = {
		type: 'circle',
		x: 150,
		y: 150,
		radius: 50,
		style: {
			background: {
				color: 'crimson',
			},
			border: {
				color: 'black',
				width: 1,
			},
		},
	};
</script>

<template>
	<Canvas>
		<Shape :config="circle"></Shape>
	</Canvas>
</template>
