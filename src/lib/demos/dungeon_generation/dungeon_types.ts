import type { Point, Rect } from "$lib/demos/demo_utils";

export type SimpleRoom = Rect & {
	color: string;
	centerPoint: Point;
};

export type SimpleDungeon = {
	rooms: SimpleRoom[];
	corridors: Point[][];
};

export type SimpleDungeonGenerator = Generator<SimpleDungeon, SimpleDungeon>;
