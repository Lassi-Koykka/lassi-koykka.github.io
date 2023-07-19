// GENERAL

export const getRandomColor = () =>
	"#" + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(1, 7);

export function adjustColorBrightness(color: string, opacity = 1) {
	// Convert to color channels
	const num = parseInt(color.slice(1), 16);

	let R = num >> 16,
		G = (num >> 8) & 0x00ff,
		B = num & 0x0000ff;

	// Interpolate channel
	opacity = Math.min(Math.max(opacity, 0), 1);
	R = Math.round(R + (1 - opacity) * (255 - R));
	G = Math.round(G + (1 - opacity) * (255 - G));
	B = Math.round(B + (1 - opacity) * (255 - B));

	// Encode as hex
	return (
		"#" +
		(
			0x1000000 +
			(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
			(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
			(B < 255 ? (B < 1 ? 0 : B) : 255)
		)
			.toString(16)
			.slice(1)
	);
}

// DRAWING

export function drawStartScreen(
	ctx: CanvasRenderingContext2D,
	canvasWidth: number,
	canvasHeight: number,
	textColor: string = "white",
	bgColor?: string
) {
	ctx.save();
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = textColor;
	ctx.font = `${canvasWidth / 10}px Arial`;
	fillBackground(ctx, canvasWidth, canvasHeight, bgColor);
	ctx.fillText("Click to start", canvasWidth / 2, canvasHeight / 2);
	ctx.restore();
}

export function drawGridLines(
	ctx: CanvasRenderingContext2D,
	gridWidth: number,
	gridHeight: number,
	tileSize: number
) {
	ctx.save();
	ctx.fillStyle = "white";
	ctx.lineWidth = 1;
	for (let row = 0; row < gridHeight; row++) {
		ctx.moveTo(0, row * tileSize);
		ctx.lineTo(gridWidth * tileSize, row * tileSize);
		ctx.stroke();
	}

	for (let col = 0; col < gridWidth; col++) {
		ctx.moveTo(col * tileSize, 0);
		ctx.lineTo(col * tileSize, gridHeight * tileSize);
		ctx.stroke();
	}

	ctx.restore();
}

export function drawGridDots(
	ctx: CanvasRenderingContext2D,
	gridWidth: number,
	gridHeight: number,
	tileSize: number
) {
	ctx.save();
	ctx.fillStyle = "#FFFFFF77";
	ctx.lineWidth = 1;
	for (let row = 0; row < gridHeight; row++) {
		for (let col = 0; col < gridWidth; col++) {
			const x = Math.ceil(col * tileSize + tileSize / 2);
			const y = Math.ceil(row * tileSize + tileSize / 2);
			ctx.beginPath();
			ctx.arc(x, y, tileSize / 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}

	ctx.restore();
}

export function fillBackground(
	ctx: CanvasRenderingContext2D,
	canvasWidth: number,
	canvasHeight: number,
	color: string = "#181818"
) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.restore();
}

// MATH
export type Point = {
	x: number;
	y: number;
};

export type Rect = {
	x: number;
	y: number;
	w: number;
	h: number;
};

export function getDistance(a: Point, b: Point) {
	return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

export function toAbsolutePosition(p: Point, tileSize: number) {
	return { x: p.x * tileSize, y: p.y * tileSize };
}

export function bresenhamLine(p1: Point, p2: Point): Point[] {
	// Make sure they are integers
	p1 = { x: p1.x | 0, y: p1.y | 0 };
	p2 = { x: p2.x | 0, y: p2.y | 0 };

	let line: Point[] = [];

	// Delta
	const dx = Math.abs(p2.x - p1.x);
	const dy = Math.abs(p2.y - p1.y);

	// Step
	const sx = p1.x < p2.x ? 1 : -1;
	const sy = p1.y < p2.y ? 1 : -1;

	// Error
	let err = dx - dy;

	// Add starting point
	line.push(p1);

	let x = p1.x;
	let y = p1.y;

	while (!(x === p2.x && y === p2.y)) {
		let e2 = err << 1;

		if (e2 > -dy) {
			err -= dy;
			x += sx;
		}

		if (e2 < dx) {
			err += dx;
			y += sy;
		}

		line.push({ x, y });
	}

	return line;
}
