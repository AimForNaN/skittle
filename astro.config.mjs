import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import emoji from 'remark-emoji';
import remarkDirective from 'remark-directive';

import fileInclude from './docs/plugins/file-include.js';
import note from './docs/plugins/note.js';

// https://astro.build/config
export default defineConfig({
	outDir: './docs/dist',
	srcDir: './docs',
	integrations: [tailwind({
		applyBaseStyles: false,
	})],
	markdown: {
		remarkPlugins: [
			emoji,
			fileInclude,
			remarkDirective,
			note,
		],
		shikiConfig: {
			theme: 'material-theme',
		},
	},
});
