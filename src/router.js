import { createRouter, createWebHashHistory } from 'vue-router';

import Animation from './views/Animation.vue';
import HitDetection from './views/HitDetection.vue';
import Image from './views/Image.vue';
import Rects from './views/Rects.vue';
import TransformPoint from './views/TransformPoint.vue';
import RenderFunction from './views/RenderFunction.vue';

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
	{
		label: 'Transform Point',
		path: '/transform-point',
		component: TransformPoint,
	},
	{
		label: 'Render Function',
		path: '/render-function',
		component: RenderFunction,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
