<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import { routes } from "./router";
</script>

<template>
	<nav>
		<RouterLink :to="route.path" v-for="route in routes">{{ route.label }}</RouterLink>
	</nav>
	<main>
		<RouterView></RouterView>
	</main>
</template>

<style lang="less">
	#app {
		display: grid;
		font-family: system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		grid-template-rows: auto 1fr;

		main {
			position: relative;
		}

		nav {
			background-color: #222;
			display: flex;

			a {
				color: white;
				opacity: 0.8;
				padding: 0.75rem 1rem;
				text-decoration: none;

				&:hover, &.router-link-active {
					opacity: 1;
				}
			}
		}
	}
</style>