<script>
	import { h, ref, toRaw, unref, watch } from 'vue';
	import * as Skittle from '../plugin';

	export default {
		props: {
			autoResize: {
				type: Boolean,
				default: true,
			},
			scale: {
				type: Number,
				default: 1,
			},
			rotation: {
				type: Number,
				default: 0,
			},
			x: {
				type: Number,
				default: 0,
			},
			y: {
				type: Number,
				default: 0,
			},
		},
		setup($props, { emit, expose, slots: $slots }) {
			const stage = new Skittle.Layer();
			const $el = ref(null);

			function draw() {
				stage.draw();
			}
			function pullChildren(parent) {
				return parent.reduce((ret, shape) => {
					var { children, props, type } = shape;
					var { __name } = type;
					if (__name == 'Shape') {
						if (props) {
							let { config } = props;
							if (config) {
								ret.push(config);
							}
						}
					} else {
						if (Array.isArray(children) && children.length) {
							ret = ret.concat(pullChildren(children));
						}
					}
					return ret;
				}, []);
			}
			function resize() {
				var rect = $el.value.parentElement.getBoundingClientRect();
				stage.resize(rect.width, rect.height);
			}

			expose({
				$el,
				stage,
				draw,
				resize,
				toUrl() {
					return stage.toUrl('image/png', 0.75);
				},
			});

			watch($el, (v) => {
				stage.target = v;

				var t = new DOMMatrix();
				t = Skittle.Utils.rotate($props.rotation, t);
				t = Skittle.Utils.scale($props.scale, $props.scale, t);
				t = Skittle.Utils.translate($props.x, $props.y, t);
				stage.transform = t;

				if ($props.autoResize) {
					resize();
				}
			});

			return () => {
				var children = $slots.default ? $slots.default() : [];
				children = pullChildren(children);

				stage.shapes = new Set(
					children.map((item) => {
						item = unref(item);
						item = toRaw(item);
						return item;
					})
				);
				stage.preloadImages().then(draw);

				return h('canvas', {
					class: 'canvas-layer',
					ref: $el,
				});
			};
		},
	};
</script>

<style>
	.canvas-layer {
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		user-select: none;
	}
</style>
