import type { Point } from "./types"

export function getDistance (a: Point, b: Point) {
	return Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2)
}

export function toAbsolutePosition(p: Point, tileSize: number) {
	return {x: p.x * tileSize, y: p.y * tileSize}
}

export function bresenhamLine(p1: Point, p2: Point): Point[] {

	// Make sure they are integers
	p1 = {x: Math.floor(p1.x), y: Math.floor(p1.y)}
	p2 = {x: Math.floor(p2.x), y: Math.floor(p2.y)}

	let line: Point[] = []

	// Delta
	const dx = Math.abs(p2.x - p1.x)
	const dy = Math.abs(p2.y - p1.y)

	// Step
	const sx = (p1.x < p2.x) ? 1 : -1
	const sy = (p1.y < p2.y) ? 1 : -1

	// Error
	let err = dx - dy

	// Add starting point
	line.push(p1)

	let x = p1.x
	let y = p1.y

	while(!((x === p2.x) && (y === p2.y))) {
		let e2 = err << 1

		if (e2 > -dy) {
				err -= dy;
				x += sx;
		}

		if (e2 < dx) {
				err += dx;
				y += sy;
		}

		line.push({x, y})
	}

	return line
}
