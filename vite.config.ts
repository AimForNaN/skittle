import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	if (command == 'serve') {
		return {
			plugins: [vue()],
			resolve: {
				alias: {
					'@': fileURLToPath(new URL('./src', import.meta.url)),
				},
			},
		};
	} else {
		return {
			build: {
				lib: {
					entry: resolve(__dirname, 'src/plugin.ts'),
					name: 'Skittle',
					fileName: 'skittle',
				},
			},
		};
	}
});
