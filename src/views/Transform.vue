<script setup>
	import Canvas from "../components/Canvas.vue";
	import Shape from "../components/Shape.vue";

	const shapes = [
		{
			type: 'rect',
			x: 500,
			y: 150,
			width: 150,
			height: 150,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: {
						x: 0,
						y: -150,
					},
					scale: {
						x: 1,
						y: 2,
					},
					rotate: -15,
					translate: {
						x: 0,
						y: -150,
					},
				},
			},
		},
		{
			type: 'circle',
			x: 150,
			y: 150,
			radius: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: {
						x: 50,
						y: 0,
					},
					scale: {
						x: 1,
						y: 2,
					},
					translate: {
						x: 100,
						y: 100,
					},
				},
			},
		},
	];

</script>

<template>
	<Canvas>
		<Shape :config="shape" v-for="shape in shapes"></Shape>
	</Canvas>
	<div class="rect"></div>
	<div class="circle"></div>
</template>

<style>
	.circle {
		background-color: crimson;
		border-radius: 100%;
		opacity: 0.25;
		pointer-events: none;
		position: absolute;
		left: 150px;
		top: 150px;
		height: 100px;
		width: 100px;
		transform: translate(100px,100px) scaleY(2) translate(-50%,-50%);
		transform-origin: 50px 0;
	}

	.rect {
		background-color: crimson;
		opacity: 0.25;
		pointer-events: none;
		position: absolute;
		left: 500px;
		top: 150px;
		height: 150px;
		width: 150px;
		transform: translateY(-150px) rotate(-15deg) scaleY(2);
		transform-origin: 0 -150px;
	}
</style>