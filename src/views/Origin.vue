<script setup>
	import { ref } from 'vue';
	import anime from 'animejs/lib/anime.es.js';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';

	const $canvas = ref(null);
	const $ruler = ref(null);
	const timeline = anime.timeline({
		// delay: 500,
		direction: 'alternate',
		duration: 3000,
		easing: 'linear',
		// endDelay: 500,
		loop: true,
		update() {
			if ($canvas.value) {
				$canvas.value.draw();
			}
			if ($ruler.value) {
				$ruler.value.draw();
			}
		},
	});
	const pos = {
		x: 150,
		y: 150,
	};
	const origin = {
		x: -50,
		y: 0,
	};
	const rect = {
		type: 'rect',
		...pos,
		width: 100,
		height: 50,
		style: {
			background: {
				color: 'black',
			},
			transform: {
				origin,
				rotate: 15,
				scale: 0.25,
			},
		},
	};
	function ruler(ctx) {
		if (ctx instanceof CanvasRenderingContext2D) {
			ctx.rect(pos.x + origin.x, pos.y + origin.y, 5, 5);
			ctx.fillStyle = 'red';
			ctx.fill();
		}
	}

	timeline.add({
		targets: rect.style.transform,
		scale: 2,
	}).add({
		targets: origin,
		x: 50,
	}, 0);
</script>

<template>
	<Canvas ref="$canvas">
		<Shape :config="rect"></Shape>
	</Canvas>
	<Canvas ref="$ruler">
		<Shape :config="ruler"></Shape>
	</Canvas>
</template>
