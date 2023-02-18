<script setup>
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const rects = [
		{
			type: 'image',
			src: '/350x150.png',
			x: 50,
			y: 50,
			width: 350,
			height: 150,
			style: {
				border: '1 solid black',
				boxShadow: '5 5 0 #999',
			},
		},
	];

</script>

<template>
	<Canvas>
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
</template>
