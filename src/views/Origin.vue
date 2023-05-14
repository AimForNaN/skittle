<script setup>
	import { ref } from 'vue';
	import anime from 'animejs/lib/anime.es.js';
	import Canvas from '../components/Canvas.vue';
	import Shape from '../components/Shape.vue';

	const $canvas = ref(null);
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
		},
	});
	const pos = {
		x: 150,
		y: 150,
	};
	const origin = {
		x: 0,
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
				scale: 0.25,
			},
		},
	};
	const rect2 = {
		type: 'rect',
		...pos,
		width: 100,
		height: 50,
		style: {
			border: {
				color: 'red',
				width: 1 / 0.25,
			},
			transform: {
				origin,
				scale: 0.25,
			},
		},
	};
	const rect3 = {
		type: 'rect',
		x: 0,
		y: 0,
		width: 100,
		height: 50,
		style: {
			border: {
				color: 'blue',
				width: 1,
			},
		},
	};
	function onMousemove(e) {
		origin.x = e.offsetX - 100;
		origin.y = e.offsetY - 100;
	}
	function originRenderer(ctx) {
		if (ctx instanceof CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.rect(origin.x, origin.y, 5, 5);
			ctx.fillStyle = 'red';
			ctx.fill();
		}
	}

	timeline.add({
		targets: rect.style.transform,
		scale: 2,
	});
</script>

<template>
	<Canvas :x="100" :y="100" ref="$canvas" @mousemove="onMousemove">
		<Shape :config="rect"></Shape>
		<Shape :config="rect2"></Shape>
		<Shape :config="rect3"></Shape>
		<Shape :config="originRenderer"></Shape>
	</Canvas>
</template>
