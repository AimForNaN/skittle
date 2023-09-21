/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./docs/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				inter: 'Inter, Inter var, Inter Nerd Font',
			},
		},
	},
	plugins: [],
}
