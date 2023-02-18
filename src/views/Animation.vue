<script setup>
	import { ref } from 'vue';
	import anime from 'animejs/lib/anime.es.js';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';
	import { SkittleOrigin } from '../plugin';

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
				$canvas.value.draw(false);
			}
		},
	});
	const rects = [
		{
			type: 'rect',
			x: 50,
			y: 50,
			width: 100,
			height: 50,
			style: {
				background: 'black',
				transform: {
					rotate: 0,
					scale: 1,
				},
				transformOrigin: SkittleOrigin.TopLeft,
			},
		},
		{
			type: 'rect',
			x: 550,
			y: 50,
			width: 100,
			height: 50,
			style: {
				background: 'black',
				transform: {
					rotate: 0,
					scale: 1,
				},
				transformOrigin: SkittleOrigin.TopRight,
			},
		},
		{
			type: 'rect',
			x: 300,
			y: 175,
			width: 100,
			height: 50,
			style: {
				background: 'black',
				transform: {
					rotate: 0,
					scale: 1,
				},
				transformOrigin: SkittleOrigin.Center,
			},
		},
		{
			type: 'rect',
			x: 50,
			y: 300,
			width: 100,
			height: 50,
			style: {
				background: 'black',
				transform: {
					rotate: 0,
					scale: 1,
				},
				transformOrigin: SkittleOrigin.BottomLeft,
			},
		},
		{
			type: 'rect',
			x: 550,
			y: 300,
			width: 100,
			height: 50,
			style: {
				background: 'black',
				transform: {
					rotate: 0,
					scale: 1,
				},
				transformOrigin: SkittleOrigin.BottomRight,
			},
		},
	];

	timeline.add({
		targets: rects.map(rect => rect.style.transform),
		rotate: 360,
		scale: 2,
	});

</script>

<template>
	<Canvas ref="$canvas">
		<Shape :config="rect" v-for="rect in rects"></Shape>
	</Canvas>
</template>
