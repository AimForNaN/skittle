import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';

export default function () {
	return function (tree) {
		visit(tree, 'text', function (node, idx, parent) {
			if (node.value && node.value.startsWith('<<< ')) {
				let { value } = node;
				value = value.substring(4);

				if (value.startsWith('@')) {
					value = value.replace('@', process.cwd());
					value = path.normalize(value);
				}
				
				let parsed = path.parse(value);
				value = fs.readFileSync(value);

				parent.type = 'code';
				parent.children = [];
				parent.lang = parsed.ext.replace('.', '');
				parent.value = String(value);
			}
		});
	}
}
