<script lang="ts">
	import BackArrow from '$lib/icons/BackArrow.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	const { title, date, Content } = data;
</script>

<svelte:head>
  <title>Blog: {title}</title>
</svelte:head>

<a class="btn-ghost btn-circle btn fixed top-2 left-2 bg-neutral text-white" href="/posts">
    <BackArrow />
</a>

<article>
	{#if title}
		<h1>{title}</h1>
	{/if}
	{#if date}
		<p>Published: {date}</p>
	{/if}
	<Content />
</article>
