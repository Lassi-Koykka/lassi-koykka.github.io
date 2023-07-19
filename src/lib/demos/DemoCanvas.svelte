<script lang="ts">
	import { onMount } from "svelte";

	export let width: number = 720;
	export let height: number = 720;

	export let init: (canvas: HTMLCanvasElement) => void;

	let data: any;
	let canvas: HTMLCanvasElement;
	export let initialized = false;

	onMount(() => {
		init(canvas);
		initialized = true;
	});
</script>

<slot />

<canvas bind:this={canvas} width={`${width}`} height={`${height}`} />

<style>
	canvas {
		background-color: #181818;
		width: 90%;
		image-rendering: pixelated;
	}
</style>
