import { getDistance, bresenhamLine } from "./dungeon_utils";
import type { Point, RectRoom, SimpleDungeon, SimpleDungeonGenerator } from "./types";

let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

// --- ANIMATION PROPERTIES ---
let lastTime = 0;
const maxFps = 30;
const nextFrame = 100;

// --- GRID PROPERTIES ---
const TILE_SIZE = 20;
let GRID_WIDTH: number, GRID_HEIGHT: number;

export default function main(c: HTMLCanvasElement) {
	canvas = c;
	ctx = canvas.getContext("2d")!;

	GRID_WIDTH = Math.floor(canvas.width / TILE_SIZE);
	GRID_HEIGHT = Math.floor(canvas.height / TILE_SIZE);

	const generator = dungeonGenerator(4, GRID_HEIGHT / 4, 9);
	// --- START LOOP ---
	requestAnimationFrame((t) => loop(t, generator));
}

function loop(t: number, generator: SimpleDungeonGenerator) {
	const handle = requestAnimationFrame((t) => loop(t, generator));
	const delta = t - lastTime;
	if (delta <= nextFrame) return;

	lastTime = t;
	const { done, value: {rooms, connections} } = generator.next();

	if(done) {
		cancelAnimationFrame(handle)
	};

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBackground();
	drawRooms(rooms);
	ctx.save();
	ctx.fillStyle = "white";
	connections.forEach((connection) => connection.forEach((p) => fillGridRect(p.x, p.y)));
	ctx.restore();
	// drawGridDots();
	// drawGridLines();
}

function fillGridRect(gridX: number, gridY: number, width: number = 1, height: number = 1) {
	const x = gridX * TILE_SIZE;
	const y = gridY * TILE_SIZE;
	const w = width * TILE_SIZE;
	const h = height * TILE_SIZE;
	ctx.fillRect(x, y, w, h);
}

function drawBackground() {
	ctx.save();
	ctx.fillStyle = "#141617";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

function drawGridDots() {
	ctx.save();
	ctx.fillStyle = "#FFFFFF77";
	ctx.lineWidth = 1;
	for (let row = 0; row < GRID_HEIGHT; row++) {
		for (let col = 0; col < GRID_WIDTH; col++) {
			const x = Math.ceil(col * TILE_SIZE + TILE_SIZE / 2);
			const y = Math.ceil(row * TILE_SIZE + TILE_SIZE / 2);
			ctx.beginPath();
			ctx.arc(x, y, TILE_SIZE / 10, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}
	}

	ctx.restore();
}

function drawGridLines() {
	ctx.save();
	ctx.fillStyle = "white";
	ctx.lineWidth = 1;
	for (let row = 0; row < GRID_HEIGHT; row++) {
		ctx.moveTo(0, row * TILE_SIZE);
		ctx.lineTo(canvas.width, row * TILE_SIZE);
		ctx.stroke();
	}

	for (let col = 0; col < GRID_WIDTH; col++) {
		ctx.moveTo(col * TILE_SIZE, 0);
		ctx.lineTo(col * TILE_SIZE, canvas.height);
		ctx.stroke();
	}
}

function createRandomRoom(min: number, max: number): RectRoom {
	const width = Math.floor(min + Math.random() * (max - min));
	const height = Math.floor(min + Math.random() * (max - min));
	const x = Math.floor(Math.random() * (GRID_WIDTH - width));
	const y = Math.floor(Math.random() * (GRID_HEIGHT - height));
	const centerPoint = { x: x + width / 2, y: y + height / 2 };
	return { x, y, w: width, h: height, centerPoint };
}

function checkRoomsTouching(a: RectRoom, b: RectRoom) {
	if (a.x + a.w < b.x - 1 || a.y + a.h < b.y || b.x + b.w < a.x || b.y + b.h < a.y) return false;
	return true;
}

function pointOverlapsRoom(rooms: RectRoom[], p: Point) {
	return rooms.some((r) => !(p.x < r.x || p.y < r.y || p.x > r.x + r.w - 1 || p.y > r.y + r.h - 1));
}

function closestRooms(rooms: RectRoom[], curRoomIdx: number) {
	const roomA = rooms[curRoomIdx];
	const closest = rooms
		.map((roomB, idx) => ({
			idx,
			distance: getDistance(roomA.centerPoint, roomB.centerPoint),
			...roomB
		}))
		.filter(({ distance }) => distance)
		.sort((a, b) => (a.distance > b.distance ? 1 : -1));

	return closest;
}

function toEdgeName(a: number, b: number) {
	return [a, b].sort((a,b) => a < b ? 1 : -1).join("-")
}

function* dungeonGenerator(
	minRoomSize: number,
	maxRoomSize: number,
	maxRooms: number = Infinity
): Generator<SimpleDungeon> {
	const rooms: RectRoom[] = [];
	let retrys = 0;
	for (let i = 0; i < maxRooms && retrys < 50; ) {
		const room = createRandomRoom(minRoomSize, maxRoomSize);
		if (rooms.some((anotherRoom) => checkRoomsTouching(room, anotherRoom))) {
			yield { rooms: [...rooms, room], connections: [] };
			retrys++;
			continue;
		}
		rooms.push(room);
		i++;
		yield { rooms, connections: [] };
	}

	const connected: string[] = []
	let connections: Point[][] = [];

	for (let i = 0; i < rooms.length; i++) {
		const closest = closestRooms(rooms, i).slice(0, 2).filter(({idx}) => !connected.includes(toEdgeName(i, idx)));
		const roomA = rooms[i];
		const newConnections = closest.map((roomB) => {
			connected.push(toEdgeName(i, roomB.idx))
			return tunnelBetween(roomA.centerPoint, roomB.centerPoint).filter(p => !pointOverlapsRoom(rooms, p))
		});
		for (const connection of newConnections) {
			connections.push(connection);
			yield { rooms, connections };
		}
		yield { rooms, connections };
	}
	return { rooms, connections };
}

function drawRooms(rooms: RectRoom[]) {
	ctx.save();
	ctx.fillStyle = "darkred";
	rooms.forEach((room) => {
		fillGridRect(room.x, room.y, room.w, room.h);
	});
	ctx.restore();
}

// Return an L-shaped tunnel between these two points
function tunnelBetween(p1: Point, p2: Point): Point[] {
	const corner: Point = Math.random() < 0.5 ? { x: p2.x, y: p1.y } : { x: p1.x, y: p2.y };
	const line1 = bresenhamLine(p1, corner);

	const line2 = bresenhamLine(corner, p2);

	return [...line1, ...line2];
}
