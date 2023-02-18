<script setup>
	import { onMounted, provide, ref, watch } from 'vue';
	import { Skittle } from '../plugin';

	const $emit = defineEmits(['mousedown']);
	const $props = defineProps({
		scale: {
			type: Number,
			default: 1,
		},
		rotation: {
			type: Number,
			default: 0,
		},
		x: {
			type: Number,
			default: 0,
		},
		y: {
			type: Number,
			default: 0,
		},
	});
	const $canvas = ref(null);
	const $stage = new Skittle();

	function addShape(shape) {
		$stage.addShape(shape);
		draw();
	}
	function draw(preloadImages = true) {
		if (preloadImages) {
			$stage.preloadImages().then(($stage) => {
				$stage.draw();
			});
		} else {
			$stage.draw();
		}
	}
	function onMouseDown(e) {
		$emit('mousedown', e);
	}
	function removeShape(shape) {
		$stage.removeShape(shape);
	}
	function resize() {
		var rect = $canvas.value.parentElement.getBoundingClientRect();
		$stage.resize(rect.width, rect.height);
	}

	watch($props, () => {
		$stage.Renderer.setTransform([
			$props.scale,
			$props.rotation,
			-$props.rotation,
			$props.scale,
			$props.x,
			$props.y,
		]);
		draw();
	});

	defineExpose({
		draw,
		resize,
		stage: $stage,
	});
	provide('addShape', addShape);
	provide('removeShape', removeShape);

	onMounted(() => {
		$stage.target($canvas.value);
		resize();
	});
</script>

<template>
	<canvas class="canvas-layer" ref="$canvas" @mousedown="onMouseDown">
		<slot></slot>
	</canvas>
</template>

<style lang="less">
	.canvas-layer {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		user-select: none;
	}
</style>
