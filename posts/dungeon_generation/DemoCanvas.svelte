<script lang="ts">
	import { onMount } from "svelte";

  export let width: number = 720
  export let height: number = 720
  export let demo: (canvas: HTMLCanvasElement) => void
  let canvas: HTMLCanvasElement
  onMount(() => {
    demo(canvas)
  })
</script>

<canvas bind:this={canvas} width={`${width}`} height={`${height}`}/>

<style>
  canvas {
    width: 90%;
    image-rendering: pixelated;
  }
</style>
