import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import emoji from 'remark-emoji';
import remarkDirective from 'remark-directive';
import fileInclude from './docs/plugins/file-include.js';
import note from './docs/plugins/note.js';
import mdx from "@astrojs/mdx";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
	outDir: './docs/dist',
	srcDir: './docs',
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		mdx(),
		vue(),
	],
	markdown: {
		remarkPlugins: [emoji, fileInclude, remarkDirective, note],
		shikiConfig: {
			theme: 'material-theme'
		},
	},
});
