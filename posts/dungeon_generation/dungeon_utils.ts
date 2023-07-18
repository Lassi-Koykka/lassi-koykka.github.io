export type Point = {
	x: number,
	y: number
}

export type RectRoom = {
	x: number;
	y: number;
	w: number;
	h: number;
	centerPoint: Point
}

export function getDistance (a: Point, b: Point) {
	return Math.sqrt(Math.abs(b.x - a.x)**2 + Math.abs(b.y - a.y)**2)
}
