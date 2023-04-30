import { createRouter, createWebHashHistory } from 'vue-router';

import Animation from './views/Animation.vue';
import HitDetection from './views/HitDetection.vue';
import Image from './views/Image.vue';
import Rects from './views/Rects.vue';

export const routes = [
	{
		label: 'Animation',
		path: '/',
		component: Animation,
	},
	{
		label: 'Rect',
		path: '/rect',
		component: Rects,
	},
	{
		label: 'Image',
		path: '/image',
		component: Image,
	},
	{
		label: 'Hit Detection',
		path: '/hit-detection',
		component: HitDetection,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
