<script setup>
	import { RouterLink, RouterView } from "vue-router";
	import { routes } from "./router";
</script>

<template>
	<main>
		<RouterView></RouterView>
	</main>
	<nav>
		<RouterLink :to="route.path" v-for="route in routes">{{ route.label }}</RouterLink>
	</nav>
</template>

<style lang="less">
	#app {
		display: grid;
		font-family: system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		grid-template-columns: 1fr 300px;

		main {
			position: relative;
		}

		nav {
			background-color: #222;
			display: flex;
			flex-direction: column;

			a {
				color: white;
				opacity: 0.8;
				padding: 0.75rem 1.5rem;
				text-decoration: none;

				&:hover, &.router-link-active {
					background-color: #FFFFFF11;
					opacity: 1;
				}
			}
		}
	}
</style>
