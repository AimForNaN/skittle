interface ISkittleBackground {
	color: string;
	image: string;
	repeat: boolean;
	size: TSkittlePoint | number;
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
	scale: number;
	translate: TSkittlePoint;
}

type TSkittleTransformOriginValue = TSkittlePoint | string;

type TSkittleShapeConstructor<T extends SkittleShape> = {
	new (...args: any[]): T;
};

interface ISkittleShape {
	type: string;
}

interface ISkittleStyle {
	background: ISkittleBackground;
	border: ISkittleBorder;
	shadow: ISkittleShadow;
	transform: ISkittleTransform;
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
