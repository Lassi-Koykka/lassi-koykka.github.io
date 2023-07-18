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

export type SimpleDungeon = {
	rooms: RectRoom[];
	connections: Point[][]
}

export type SimpleDungeonGenerator = Generator<SimpleDungeon, SimpleDungeon>

