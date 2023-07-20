<script lang="ts">
	import DemoCanvas from "../DemoCanvas.svelte";
	import SimpleNaiveDungeon, { type SimpleNaiveDungeonInput } from "./simpleNaive";

	const canvasSize = 600;

	let demo: SimpleNaiveDungeon;
	let input: SimpleNaiveDungeonInput = {
		tileSize: 20,
		minRoomSize: 3,
		maxRoomSize: 8,
		targetRoomCount: 9
	};

	let fps = 3;
	$: if (demo) demo.stepTime = 1000 / fps;

	const init = (canvas: HTMLCanvasElement) => {
		demo = new SimpleNaiveDungeon(canvas, 1000, input);
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-row gap-2">
		<div class="w-full">
			<label for="minRoomSize">Minimum room size:</label>
			<input
				name="minRoomSize"
				type="number"
				class="input w-full"
				bind:value={input.minRoomSize}
				min={1}
				max={input.maxRoomSize}
			/>
		</div>

		<div class="w-full">
			<label for="maxRoomSize">Maximum room size:</label>
			<input
				name="maxRoomSize"
				min={input.minRoomSize}
				max={canvasSize / input.tileSize}
				type="number"
				class="input w-full"
				bind:value={input.maxRoomSize}
			/>
		</div>
	</div>

	<div class="flex flex-row gap-2">
		<div class="w-full">
			<label for="targetRoomCount">Target room count:</label>
			<input
				name="targetRoomCount"
				type="number"
				class="input w-full"
				bind:value={input.targetRoomCount}
				min={1}
			/>
		</div>

		<div class="w-full">
			<label for="framerate">Animation framerate:</label>
			{fps}
			<input name="framerate" type="range" min={1} max={60} class="input w-full" bind:value={fps} />
		</div>
	</div>

	<button
		class="btn-outline btn-xl btn-ghost btn rounded-xl text-xl"
		on:click={() => demo?.start()}
	>
		Generate
	</button>
	<DemoCanvas {init} width={canvasSize} height={canvasSize} />
</div>
