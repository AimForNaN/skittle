<script setup>
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const shapes = [
		{
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
		},
	];

</script>

<template>
	<Canvas>
		<Shape :config="shape" v-for="shape in shapes"></Shape>
	</Canvas>
</template>
