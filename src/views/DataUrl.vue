<script setup>
	import { shallowRef } from 'vue';
	import { Layer } from '../lib';

	const pattern = shallowRef('');
	const section = shallowRef('');
	const img = {
		type: 'rect',
		x: 0,
		y: 0,
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
				color: '#999',
			},
		},
	};
	const $skittle = new Layer();
	$skittle.addShape(img);
	$skittle.resize(700, 300);
	$skittle.preloadImages().then((stage) => {
		stage.draw();
		stage.toUrl().then((data) => {
			pattern.value = data;
		});

		var data = stage.toData(350, 150, 350, 150);
		stage.resize(350, 150);
		stage.context.putImageData(data, 0, 0);
		stage.toUrl().then((data) => {
			section.value = data;
		});
	});
</script>

<template>
	<img :src="pattern" style="margin: 1rem" />
	<img :src="section" style="margin: 1rem" />
</template>
