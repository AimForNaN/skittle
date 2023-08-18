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
				border: {
					color: 'black',
					style: 'solid',
					width: 1,
				},
				shadow: {
					x: 5,
					y: 5,
					blur: 0,
					color: '#000',
				},
				transform: {
					rotate: 5,
				},
			},
		},
		{
			type: 'rect',
			x: 50,
			y: 250,
			width: 700,
			height: 300,
			style: {
				background: {
					image: '/350x150.png',
					repeat: 'repeat',
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
					color: '#000',
				},
				transform: {
					rotate: 5,
				},
			},
		},
		{
			type: 'rect',
			x: 50,
			y: 600,
			width: 350,
			height: 150,
			style: {
				background: {
					image: '/350x150.png',
					repeat: 'repeat',
					size: 0.5,
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
					color: '#000',
				},
				transform: {
					rotate: 5,
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
