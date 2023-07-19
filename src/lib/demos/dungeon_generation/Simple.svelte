<script lang="ts">
	import DemoCanvas from "../DemoCanvas.svelte";
	import SimpleDungeonGeneratorDemo, { type SimpleDungeonGeneratorInput } from "./simple";
	let demo: SimpleDungeonGeneratorDemo;
	let input: SimpleDungeonGeneratorInput = {
		tileSize: 20,
		minRoomSize: 3,
		maxRoomSize: 8,
		targetRoomCount: 9
	};
	const init = (canvas: HTMLCanvasElement) => {
		demo = new SimpleDungeonGeneratorDemo(canvas, 1000, input);
	};
</script>

<button on:click={() => demo?.start()}>start</button>
<DemoCanvas {init} />
