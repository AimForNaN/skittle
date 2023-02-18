interface ISkittleBackground {
	color: string;
	image: string;
	repeat: string;
}

interface ISkittleBorder {
	color: string;
	style: number[] | string;
	width: number;
}

interface ISkittleShadow {
	x: number;
	y: number;
	blur: number;
	color: string;
}

interface ISkittleTransform {
	origin: TSkittleTransformOriginValue;
	rotate: number;
	scale: TSkittlePoint;
	translate: TSkittlePoint;
}

type TSkittleBackgroundValue = ISkittleBackground | string;
type TSkittleBorderValue = ISkittleBorder | string;
type TSkittleShadowValue = ISkittleShadow | string;
type TSkittleTransformValue = ISkittleTransform | string;
type TSkittleTransformOriginValue = TSkittlePoint | SkittleOrigin;

type TSkittleShapeConstructor<T extends SkittleShape> = {
	new (...args: any[]): T;
};

interface ISkittleShape {
	type: string;
}

interface ISkittleStyleBase {
	background: ISkittleBackground;
	border: ISkittleBorder;
	boxShadow: ISkittleShadow;
	transform: ISkittleTransform;
}
interface ISkittleStyle extends ISkittleStyleBase {
	background: ISkittleBackground;
	border: ISkittleBorder;
	boxShadow: ISkittleShadow;
	transform: ISkittleTransform;
	transformOrigin: TSkittleTransformOriginValue;
}

interface ISkittleStyledShape extends ISkittleShape {
	style: ISkittleStyle;
}

interface ISkittleRect extends ISkittleStyledShape {
	type: 'rect';
	x: number;
	y: number;
	width: number;
	height: number;
}

interface ISkittleImage extends ISkittleRect {
	type: 'image';
	src: string;
}

type TSkittleShape = ISkittleRect | ISkittleImage;
type TSkittleAnyShape = SkittleShape | ISkittleShape;
