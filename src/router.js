import { createRouter, createWebHashHistory } from 'vue-router';

import Animation from './views/Animation.vue';
import Circle from './views/Circle.vue';
import DataUrl from './views/DataUrl.vue';
import HitDetection from './views/HitDetection.vue';
import Image from './views/Image.vue';
import Origin from './views/Origin.vue';
import Rects from './views/Rects.vue';
import RenderFunction from './views/RenderFunction.vue';
import Transform from './views/Transform.vue';
import TransformPoint from './views/TransformPoint.vue';

export const routes = [
	{
		label: 'Rect',
		path: '/',
		component: Rects,
	},
	{
		label: 'Circle',
		path: '/circle',
		component: Circle,
	},
	{
		label: 'Image',
		path: '/image',
		component: Image,
	},
	{
		label: 'Data URI',
		path: '/data-uri',
		component: DataUrl,
	},
	{
		label: 'Transform',
		path: '/transform',
		component: Transform,
	},
	{
		label: 'Origin',
		path: '/origin',
		component: Origin,
	},
	{
		label: 'Animation',
		path: '/animation',
		component: Animation,
	},
	{
		label: 'Hit Detection',
		path: '/hit-detection',
		component: HitDetection,
	},
	{
		label: 'Map to Canvas',
		path: '/map-to-canvas',
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
