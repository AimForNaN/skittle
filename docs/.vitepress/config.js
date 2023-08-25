import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	base: '/skittle/',
	title: 'Skittle',
	description: 'API-agnostic, canvas library',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Guides', link: '/guides/' },
		],

		sidebar: [
			{
				text: 'Guides',
				items: [
					{ text: 'Getting started', link: '/guides/' },
					{ text: 'Shapes', link: '/guides/shapes' },
					{ text: 'Filters', link: '/guides/filters' },
					{ text: 'Transformations', link: '/guides/transformations' },
				],
			},
			{
				text: 'Examples',
				items: [
					{ text: 'Animations', link: '/examples/animations' },
					{ text: 'Hit detection', link: '/examples/hit-detection' },
					{ text: 'Transform origin', link: '/examples/origin' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/truefusion/skittle' },
		],
	},
	vite: {
		ssr: {
			noExternal: ['animejs/lib/anime.es.js'],
		},
	},
});
