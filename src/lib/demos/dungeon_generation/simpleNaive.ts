import {
	getDistance,
	bresenhamLine,
	type Point,
	getRandomColor,
	drawTitleScreen,
	fillGridCell,
	toEdgeName,
	fill2DGrid,
	type Rect
} from "$lib/demos/demo_utils";
import Demo from "../Demo";

export type SimpleRoom = Rect & {
	color: string;
	centerPoint: Point;
};

export type SimpleDungeon = {
	rooms: SimpleRoom[];
	corridors: Point[][];
};

export type SimpleDungeonGenerator = Generator<SimpleDungeon, SimpleDungeon>;

export interface SimpleNaiveDungeonInput {
	tileSize: number;
	targetRoomCount: number;
	minRoomSize?: number;
	maxRoomSize?: number;
}

export default class SimpleNaiveDungeon extends Demo {
	started = false;

	tileSize: number;
	gridWidth: number;
	gridHeight: number;
	grid: number[][];

	generator: SimpleDungeonGenerator;
	input: SimpleNaiveDungeonInput;

	rooms: SimpleRoom[] = [];
	corridors: Point[][] = [];
	connected: string[] = [];

	constructor(canvas: HTMLCanvasElement, stepTime: number, input: SimpleNaiveDungeonInput) {
		super(canvas, stepTime);
		const { tileSize, minRoomSize, maxRoomSize, targetRoomCount } = input;
		this.tileSize = tileSize;
		this.gridWidth = (canvas.width / tileSize) | 0;
		this.gridHeight = (canvas.height / tileSize) | 0;
		this.grid = fill2DGrid(this.gridWidth, this.gridHeight);

		this.input = input;
		this.generator = this.dungeonGenerator(minRoomSize, maxRoomSize, targetRoomCount);

		drawTitleScreen(this.ctx, "Simple Dungeon Generator", canvas.width, canvas.height);
	}

	start(input?: SimpleNaiveDungeonInput) {
		this.started = true;
		this.rooms = [];
		this.corridors = [];
		this.connected = [];
		this.initGenerator(input ?? this.input);
		this.requestAnimationFrameHandle = requestAnimationFrame((t) => this.loop(t));
	}

	loop(t: number) {
		this.requestAnimationFrameHandle = requestAnimationFrame((t) => this.loop(t));
		const delta = t - this.lastTime;
		if (delta <= this.stepTime) return;
		this.lastTime = t;

		const dungeon = this.update();
		this.draw(dungeon);
	}

	update() {
		const { done, value } = this.generator.next();

		if (done) {
			cancelAnimationFrame(this.requestAnimationFrameHandle);
		}
		return value;
	}

	draw({ rooms, corridors }: SimpleDungeon) {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.save();
		rooms.forEach((room) => {
			for (let y = room.y; y < room.y + room.h; y++) {
				for (let x = room.x; x < room.x + room.w; x++) {
					fillGridCell(this.ctx, x, y, this.tileSize, room.color);
				}
			}
		});
		corridors.forEach((corridor) =>
			corridor.forEach((p) => fillGridCell(this.ctx, p.x, p.y, this.tileSize, "white"))
		);
		this.ctx.restore();
	}

	initGenerator(input: SimpleNaiveDungeonInput) {
		const { tileSize, minRoomSize, maxRoomSize, targetRoomCount } = input;
		this.tileSize = tileSize;
		this.generator = this.dungeonGenerator(minRoomSize, maxRoomSize, targetRoomCount);
	}

	*dungeonGenerator(
		minRoomSize: number = 4,
		maxRoomSize: number = this.gridWidth / 4,
		targetRoomCount: number = Infinity
	): Generator<SimpleDungeon> {
		let retrys = 0;
		for (let i = 0; i < targetRoomCount && retrys < 50; ) {
			const newRoom = this.createRandomRoom(minRoomSize, maxRoomSize);
			if (this.rooms.some((anotherRoom) => this.checkRoomsTouching(newRoom, anotherRoom))) {
				yield { rooms: [...this.rooms, newRoom], corridors: this.corridors };
				retrys++;
				continue;
			}
			this.rooms.push(newRoom);
			i++;
			yield this.getRoomsAndConnections();
		}

		const connected: string[] = [];

		for (let i = 0; i < this.rooms.length; i++) {
			// Get two closest rooms.
			// Discard if already connected
			const closest = this.getClosestRooms(i)
				.slice(0, 2)
				.filter(({ idx }) => !connected.includes(toEdgeName(i, idx)));
			const curRoom = this.rooms[i];
			const newConnections = closest.map((room) => {
				connected.push(toEdgeName(i, room.idx));
				return this.tunnelBetween(curRoom.centerPoint, room.centerPoint).filter(
					// Filter out corridors inside
					(p) => !this.pointOverlapsRoom(p)
				);
			});
			for (const connection of newConnections) {
				this.corridors.push(connection);
				yield this.getRoomsAndConnections();
			}
			yield this.getRoomsAndConnections();
		}
		return this.getRoomsAndConnections();
	}

	getRoomsAndConnections() {
		return { rooms: this.rooms, corridors: this.corridors };
	}

	createRandomRoom(min: number, max: number): SimpleRoom {
		const width = Math.floor(min + Math.random() * (max - min));
		const height = Math.floor(min + Math.random() * (max - min));
		const x = Math.floor(Math.random() * (this.gridWidth - width));
		const y = Math.floor(Math.random() * (this.gridHeight - height));
		const centerPoint = { x: x + width / 2, y: y + height / 2 };
		return { x, y, w: width, h: height, centerPoint, color: getRandomColor() };
	}

	checkRoomsTouching(a: SimpleRoom, b: SimpleRoom) {
		if (a.x + a.w < b.x || a.y + a.h < b.y || b.x + b.w < a.x || b.y + b.h < a.y) return false;
		return true;
	}

	pointOverlapsRoom(p: Point) {
		return this.rooms.some(
			(r) => !(p.x < r.x || p.y < r.y || p.x > r.x + r.w - 1 || p.y > r.y + r.h - 1)
		);
	}

	tunnelBetween(p1: Point, p2: Point): Point[] {
		const corner: Point = Math.random() < 0.5 ? { x: p2.x, y: p1.y } : { x: p1.x, y: p2.y };
		const line1 = bresenhamLine(p1, corner);

		const line2 = bresenhamLine(corner, p2);

		return [...line1, ...line2];
	}

	getClosestRooms(curRoomIdx: number) {
		const roomA = this.rooms[curRoomIdx];
		const closest = this.rooms
			.map((roomB, idx) => ({
				idx,
				distance: getDistance(roomA.centerPoint, roomB.centerPoint),
				...roomB
			}))
			.filter(({ distance }) => distance)
			.sort((a, b) => (a.distance > b.distance ? 1 : -1));
		return closest;
	}
}
