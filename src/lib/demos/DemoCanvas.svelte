<script lang="ts">
	import { onMount } from "svelte";

	export let width: number;
	export let height: number;

	export let init: (canvas: HTMLCanvasElement) => void;

	let data: any;
	let canvas: HTMLCanvasElement;

	onMount(() => {
		init(canvas);
	});
</script>

<slot />

<canvas bind:this={canvas} width={`${width}`} height={`${height}`} />

<style>
	canvas {
		width: 100%;
		background-color: #181818;
		image-rendering: pixelated;
	}
</style>
