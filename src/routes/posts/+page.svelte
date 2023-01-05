<script lang="ts">
	import BackArrow from "$lib/icons/BackArrow.svelte";
	import type { PageData } from './$types';
	export let data: PageData;
	const { posts } = data
</script>


<svelte:head>
  <title>Blog posts</title>
</svelte:head>

<a class="btn-ghost btn-circle btn fixed top-2 left-2 bg-neutral text-white" href="/">
    <BackArrow />
</a>

<div class="max-w-5xl mx-auto mt-14 px-4 w-full">
	<h1 class="text-4xl md:text-7xl text-center text-accent">Blog posts</h1>
	<h1 class="text-4xl md:text-7xl text-center">---</h1>
	
	{#if posts.length < 1}
	<div class="grid items-center">
			<h1 class="text-2xl text-center md:text-4xl">No blog posts here... <br/>yet ;)</h1>
		</div>
	{/if}
	{#each posts as p}
		<div class="m-auto">
			<h2 class="text-lg md:text-2xl">{p.date} {p.updated ? "Updated: " + p.updated : ""}</h2>
			<a href={"/posts/" + p.slug} class="text-2xl md:text-4xl underline hover:text-primary">{p.title}</a>
		</div>
	{/each}
</div>
