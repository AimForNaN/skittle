import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	outDir: './docs/dist',
	srcDir: './docs',
	integrations: [tailwind({
		applyBaseStyles: false,
	})],
	markdown: {
		shikiConfig: {
			theme: 'material-theme',
		},
	},
});
