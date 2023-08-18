export default function (obj) {
	var images = [];

	if (typeof obj != 'object') {
		return images;
	}

	if (obj.type == 'image') {
		if (typeof obj.src == 'string') {
			images.push(obj.src);
		}
	}

	if (typeof obj.style == 'object') {
		if (typeof obj.style.background == 'object') {
			if (typeof obj.style.background.image == 'string') {
				images.push(obj.style.background.image);
			}
		}
	}

	return images;
}
