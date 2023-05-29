<script setup>
	import { ref } from 'vue';
	import anime from 'animejs/lib/anime.es.js';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';
	import * as Skittle from '../plugin';

	const $canvas = ref(null);
	const timeline = anime.timeline({
		delay: 500,
		direction: 'alternate',
		duration: 2000,
		easing: 'linear',
		endDelay: 500,
		loop: true,
		update() {
			if ($canvas.value) {
				$canvas.value.draw();
			}
		},
	});
	const rects = [
		{
			type: 'rect',
			x: 0,
			y: 0,
			width: 100,
			height: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					// origin: Skittle.Origin.TopLeft,
					rotate: 0,
					scale: 1,
				},
			},
		},
		{
			type: 'rect',
			x: 500,
			y: 0,
			width: 100,
			height: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: Skittle.Origin.TopRight,
					rotate: 0,
					scale: 1,
				},
			},
		},
		{
			type: 'rect',
			x: 250,
			y: 125,
			width: 100,
			height: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: Skittle.Origin.Center,
					rotate: 0,
					scale: 1,
				},
			},
		},
		{
			type: 'rect',
			x: 0,
			y: 250,
			width: 100,
			height: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: Skittle.Origin.BottomLeft,
					rotate: 0,
					scale: 1,
				},
			},
		},
		{
			type: 'rect',
			x: 500,
			y: 250,
			width: 100,
			height: 50,
			style: {
				background: {
					color: 'black',
				},
				transform: {
					origin: Skittle.Origin.BottomRight,
					rotate: 0,
					scale: 1,
				},
			},
		},
	];
	const ruler = {
		type: 'rect',
		x: 0,
		y: 0,
		width: 150,
		height: 150,
		style: {
			border: {
				color: 'blue',
				style: 'solid',
				width: 1,
			},
		},
	};

	timeline.add({
		targets: rects.map(rect => rect.style.transform),
		rotate: 360,
		scale: 2,
	});

</script>

<template>
	<Canvas>
		<Shape :config="ruler"></Shape>
	</Canvas>
	<Canvas :x="150" :y="150" :scale="0.5" :rotation="15" ref="$canvas">
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
</template>
