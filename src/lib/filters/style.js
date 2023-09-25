import StyleBackground from './style-background';
import StyleBorder from './style-border';
import StyleOpacity from './style-opacity';
import StyleShadow from './style-shadow';
import StyleTransform from './style-transform';

export default function (ctx, shape) {
	StyleOpacity(ctx, shape);
	StyleBackground(ctx, shape);
	StyleBorder(ctx, shape);
	StyleShadow(ctx, shape);
	StyleTransform(ctx, shape);
}
