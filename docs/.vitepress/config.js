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
				items: [{ text: 'Getting started', link: '/guides/' }],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/truefusion/skittle' },
		],
	},
});
