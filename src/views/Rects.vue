<script setup>
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const rects = [
		{
			type: 'rect',
			x: 50,
			y: 50,
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
		{
			type: 'rect',
			x: 300,
			y: 300,
			width: 200,
			height: 200,
			style: {
				background: {
					color: 'blue',
				},
				border: {
					color: 'black',
					style: 'solid',
					width: 1,
				},
				shadow: {
					x: 5,
					y: 5,
					blur: 0,
					color: '#999',
				},
			},
		},
	];
</script>

<template>
	<Canvas>
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
</template>
