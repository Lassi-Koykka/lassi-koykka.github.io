export default abstract class Demo {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	requestAnimationFrameHandle: number = 0;

	// --- ANIMATION PROPERTIES ---
	lastTime = 0;
	public stepTime: number;

	// -- GENERATOR PROPERTIES

	constructor(canvas: HTMLCanvasElement, stepTime: number = 1000) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d")!;
		this.stepTime = stepTime;
	}

	abstract start(input: any): void;

	abstract update(): any;

	abstract draw(data?: any): void;

	abstract loop(t: number): void;
}
