<script setup>
	import { reactive, ref } from 'vue';
	import anime from 'animejs/lib/anime.es.js';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';

	const $canvas = ref(null);
	const timeline = anime.timeline({
		direction: 'alternate',
		duration: 2000,
		easing: 'linear',
		loop: true,
		update() {
			if ($canvas.value) {
				$canvas.value.draw();
			}
		},
	});
	const pos = reactive({
		x: 150,
		y: 150,
	});
	const origin = reactive({
		x: 0,
		y: 0,
	});
	const transform = {
		scale: 1,
	};
	function onMousemove(e) {
		origin.x = e.offsetX - pos.x;
		origin.y = e.offsetY - pos.y;
	}
	function shapesRenderer(ctx) {
		const shapes = [
			{
				type: 'rect',
				...pos,
				width: 100,
				height: 50,
				style: {
					background: {
						color: 'black',
					},
					opacity: 0.5,
					transform: {
						origin,
						scale: transform.scale,
					},
				},
			},
			{
				type: 'circle',
				...pos,
				radius: 50,
				style: {
					background: {
						color: 'black',
					},
					opacity: 0.25,
					transform: {
						origin,
						scale: transform.scale,
					},
				},
			},
			{
				type: 'rect',
				...pos,
				width: 100,
				height: 50,
				style: {
					border: {
						color: 'red',
						width: 1,
					},
				},
			},
			{
				type: 'circle',
				...pos,
				radius: 50,
				style: {
					border: {
						color: 'red',
						width: 1,
					},
				},
			},
		];
		shapes.forEach((shape) => {
			$canvas.value.stage.renderer.draw(shape, ctx);
		});
	}
	function originRenderer(ctx) {
		var shapes = [
			{
				type: 'circle',
				x: origin.x + pos.x,
				y: origin.y + pos.y,
				radius: 3,
				style: {
					background: {
						color: 'red',
					},
				},
			},
		];
		shapes.forEach((shape) => {
			$canvas.value.stage.renderer.draw(shape, ctx);
		});
	}

	timeline.add({
		targets: transform,
		scale: 2,
	});
</script>

<template>
	<Canvas ref="$canvas" @mousemove="onMousemove">
		<Shape :config="shapesRenderer"></Shape>
		<Shape :config="originRenderer"></Shape>
	</Canvas>
	<div class="box">origin: {{ origin }}</div>
</template>

<style>
	.box {
		padding: 0.25rem;
		pointer-events: none;
		position: absolute;
	}
</style>
