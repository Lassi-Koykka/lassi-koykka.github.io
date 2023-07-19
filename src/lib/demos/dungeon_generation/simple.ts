import {
	getDistance,
	bresenhamLine,
	type Point,
	fillBackground,
	getRandomColor,
	drawStartScreen
} from "$lib/demos/demo_utils";
import type { SimpleRoom, SimpleDungeon, SimpleDungeonGenerator } from "./dungeon_types";

let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

// --- ANIMATION PROPERTIES ---
let lastTime = 0;
const maxFps = 5;
const nextFrame = 1000 / maxFps;

let requestAnimationFrameHandle: number;

// --- GRID PROPERTIES ---
const TILE_SIZE = 20;
let GRID_WIDTH: number, GRID_HEIGHT: number;

let generator: SimpleDungeonGenerator;

export function init(c: HTMLCanvasElement) {
	canvas = c;
	ctx = canvas.getContext("2d")!;

	GRID_WIDTH = Math.floor(canvas.width / TILE_SIZE);
	GRID_HEIGHT = Math.floor(canvas.height / TILE_SIZE);

	drawStartScreen(ctx, canvas.width, canvas.height);
}

export function start() {
	if (requestAnimationFrameHandle) cancelAnimationFrame(requestAnimationFrameHandle);
	generator = dungeonGenerator(4, GRID_HEIGHT / 4, 9);
	// --- START LOOP ---
	requestAnimationFrame((t) => loop(t, generator));
}

function loop(t: number, generator: SimpleDungeonGenerator) {
	requestAnimationFrameHandle = requestAnimationFrame((t) => loop(t, generator));
	const delta = t - lastTime;
	if (delta <= nextFrame) return;

	lastTime = t;
	const {
		done,
		value: { rooms, connections }
	} = generator.next();

	if (done) {
		cancelAnimationFrame(requestAnimationFrameHandle);
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	fillBackground(ctx, canvas.width, canvas.height);
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

function createRandomRoom(min: number, max: number): SimpleRoom {
	const width = Math.floor(min + Math.random() * (max - min));
	const height = Math.floor(min + Math.random() * (max - min));
	const x = Math.floor(Math.random() * (GRID_WIDTH - width));
	const y = Math.floor(Math.random() * (GRID_HEIGHT - height));
	const centerPoint = { x: x + width / 2, y: y + height / 2 };
	return { x, y, w: width, h: height, centerPoint, color: getRandomColor() };
}

function checkRoomsTouching(a: SimpleRoom, b: SimpleRoom) {
	if (a.x + a.w < b.x || a.y + a.h < b.y || b.x + b.w < a.x || b.y + b.h < a.y) return false;
	return true;
}

function pointOverlapsRoom(rooms: SimpleRoom[], p: Point) {
	return rooms.some((r) => !(p.x < r.x || p.y < r.y || p.x > r.x + r.w - 1 || p.y > r.y + r.h - 1));
}

function closestRooms(rooms: SimpleRoom[], curRoomIdx: number) {
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
	return [a, b].sort((a, b) => (a < b ? 1 : -1)).join("-");
}

function* dungeonGenerator(
	minRoomSize: number,
	maxRoomSize: number,
	maxRooms: number = Infinity
): Generator<SimpleDungeon> {
	const rooms: SimpleRoom[] = [];
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

	const connected: string[] = [];
	let connections: Point[][] = [];

	for (let i = 0; i < rooms.length; i++) {
		const closest = closestRooms(rooms, i)
			.slice(0, 2)
			.filter(({ idx }) => !connected.includes(toEdgeName(i, idx)));
		const roomA = rooms[i];
		const newConnections = closest.map((roomB) => {
			connected.push(toEdgeName(i, roomB.idx));
			return tunnelBetween(roomA.centerPoint, roomB.centerPoint).filter(
				(p) => !pointOverlapsRoom(rooms, p)
			);
		});
		for (const connection of newConnections) {
			connections.push(connection);
			yield { rooms, connections };
		}
		yield { rooms, connections };
	}
	return { rooms, connections };
}

function drawRooms(rooms: SimpleRoom[]) {
	ctx.save();
	rooms.forEach((room) => {
		ctx.fillStyle = room.color;
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
