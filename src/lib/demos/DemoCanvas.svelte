<script lang="ts">
	import { onMount } from "svelte";

	export let width: number = 720;
	export let height: number = 720;

	export let init: (canvas: HTMLCanvasElement) => void;
	export let start: () => void;

	let canvas: HTMLCanvasElement;
	let initialized = false;

	onMount(() => {
		init(canvas);
		initialized = true;
	});
</script>

<canvas
	bind:this={canvas}
	width={`${width}`}
	height={`${height}`}
	on:click={() => initialized && start()}
/>

<style>
	canvas {
		width: 90%;
		image-rendering: pixelated;
	}
</style>
