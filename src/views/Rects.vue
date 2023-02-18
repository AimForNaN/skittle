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
				background: 'black',
				transform: 'rotate(45deg)',
				transformOrigin: 'center',
			},
		},
		{
			type: 'rect',
			x: 300,
			y: 300,
			width: 200,
			height: 200,
			style: {
				background: 'blue',
				border: '1 solid black',
				boxShadow: '5px 5px 0 #999',
			},
		},
	];

</script>

<template>
	<Canvas>
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
</template>
