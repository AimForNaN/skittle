<script setup>
	import { inject, onBeforeUnmount } from 'vue';

	const $props = defineProps({
		config: {
			type: Object,
			default() {
				return {};
			},
		},
	});
	const addShape = inject('addShape');
	const removeShape = inject('removeShape');

	addShape($props.config);

	onBeforeUnmount(() => {
		removeShape($props.config);
	});
</script>

<template>
	<!-- shape -->
</template>