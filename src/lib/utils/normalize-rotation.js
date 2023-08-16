import {
	rotateDEG
} from 'transformation-matrix';

export default function (rotate) {
	if (typeof rotate == 'number') {
		return rotateDEG(rotate);
	}
	return new DOMMatrix();
}
