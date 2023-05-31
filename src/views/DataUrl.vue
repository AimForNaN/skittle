<script setup>
	import { shallowRef } from 'vue';
	import { Layer } from '../lib';

	const src = shallowRef('');
	const img = {
		type: 'image',
		src: '/350x150.png',
		x: 0,
		y: 0,
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
				color: '#999',
			},
		},
	};
	const $skittle = new Layer();
	$skittle.addShape(img);
	$skittle.resize(350,150);
	$skittle.preloadImages().then((stage) => {
		stage.draw();
		stage.toUrl().then((data) => {
			src.value = data;
		});
	});
</script>

<template>
	<img :src="src" style="margin: 1rem;">
</template>
