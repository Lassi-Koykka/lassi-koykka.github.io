let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;

// --- ANIMATION PROPERTIES ---
let lastTime = 0;
const maxFps = 30;
const nextFrame = 1000 / maxFps;

// --- GRID PROPERTIES ---
const TILE_SIZE = 20;
let GRID_WIDTH: number, GRID_HEIGHT: number;

export default function main(c: HTMLCanvasElement) {
	canvas = c;
	ctx = canvas.getContext("2d")!;

	GRID_WIDTH = Math.floor(canvas.width / TILE_SIZE);
	GRID_HEIGHT = Math.floor(canvas.height / TILE_SIZE);

	// --- START LOOP ---
	requestAnimationFrame(loop);
}

function loop(t: number) {
	const delta = t - lastTime;
	if (delta <= nextFrame) return;

	lastTime = t;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBackground();
	const {rooms} = generateDungeon(4, GRID_HEIGHT / 4, 9);
	drawRooms(rooms);
	// drawGridDots();
	// drawGridLines();
}

function fillGridRect(gridX: number, gridY: number, width: number, height: number) {
	const x = gridX * TILE_SIZE
	const y = gridY * TILE_SIZE
	const w = width * TILE_SIZE
	const h = height * TILE_SIZE
	ctx.fillRect(x, y, w, h)
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

interface Point {
	x: number,
	y: number
}

interface Room {
	x: number;
	y: number;
	w: number;
	h: number;
	centerPoint: Point
}


function createRandomRoom(min: number, max: number): Room {
	const width = Math.floor(min + Math.random() * (max - min));
	const height = Math.floor(min + Math.random() * (max - min));
	const x = Math.floor(Math.random() * (GRID_WIDTH - width));
	const y = Math.floor(Math.random() * (GRID_HEIGHT - height));

	return { x, y, w: width, h: height, centerPoint: { x: x + width / 2, y: y + height / 2 } };
}

function checkRoomOverlap(a: Room, b: Room) {
	if (a.x + a.w < b.x - 1 || a.y + a.h < b.y || b.x + b.w < a.x || b.y + b.h < a.y) return false;
	return true;
}

function generateDungeon(minRoomSize: number, maxRoomSize: number, maxRooms: number = Infinity) {
	const rooms: Room[] = [];
	let retrys = 0;
	for (let i = 0; i < maxRooms && retrys < 50;) {
		const room = createRandomRoom(minRoomSize, maxRoomSize);
		if(rooms.some(anotherRoom => checkRoomOverlap(room, anotherRoom))) {
			retrys++;
			continue;
		}
		rooms.push(room)
		i++;
	}

	return {rooms}
}

function drawRooms(rooms: Room[]) {
	ctx.save()
	ctx.fillStyle = "darkred"
	rooms.forEach(room => {
		fillGridRect(room.x, room.y, room.w, room.h)
	})
	ctx.restore()
}
