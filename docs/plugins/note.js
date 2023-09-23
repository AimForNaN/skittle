import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

export default function () {
	return function (tree) {
		visit(tree, 'containerDirective', function (node, idx, parent) {
			switch (node.name) {
				case 'note': {
					// TODO: Find a way this simplify this!
					let p = h('p', { class: 'font-bold uppercase' }, node.name);
					p.data = {
						hName: p.tagName,
						hProperties: p.properties,
					};

					let div = h('div', { class: 'bg-sky-100 flex flex-col gap-4 p-8 rounded text-sky-800' }, [
						p,
						...node.children,
					]);

					node.children = div.children;

					let data = node.data ?? (node.data = {});
					data.hName = div.tagName;
					data.hProperties = div.properties;
					break;
				}
			}
		});
	}
}
