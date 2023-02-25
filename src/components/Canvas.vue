<script>
	import { h, ref, watch } from 'vue';
	import Skittle from '../plugin';

	export default {
		props: {
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
		setup($props, { expose, slots: $slots }) {
			const $stage = new Skittle.Layer();
			const $el = ref(null);

			function draw() {
				$stage.preloadImages().then((stage) => {
					stage.draw();
				});
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
				$stage.resize(rect.width, rect.height);
				draw();
			}

			expose({
				$el,
				draw,
				resize,
			});

			watch($el, (v) => {
				$stage.target(v);
				resize();
				draw();
			});

			return () => {
				var children = $slots.default ? $slots.default(): [];
				children = pullChildren(children);
				$stage.setShapes(children);

				var r = $stage.Renderer;
				r.resetTransform();
				r.rotate($props.rotation);
				r.scale($props.scale);
				r.translate($props.x, $props.y);

				return h('canvas', {
					class: 'canvas-layer',
					ref: $el,
				});
			};
		}
	}
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
