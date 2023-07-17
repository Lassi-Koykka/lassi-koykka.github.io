<script lang="ts">
	import BackArrow from "$lib/icons/BackArrow.svelte";
	import type { PageData } from "./$types";
	export let data: PageData;
	const { title, date, updated, Content } = data;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<a class="btn-ghost btn-circle btn fixed top-2 left-2 bg-neutral text-white" href="/posts">
	<BackArrow />
</a>

<article>
	{#if title}
		<h1 class="text-accent">{title}</h1>
	{/if}
	{#if date}
		<p>
			Published: <span class="text-secondary-focus">{date}</span>
			{#if updated}
				<div>
					Updated: <span class="text-secondary-focus">{updated}</span>
				</div>
			{/if}
		</p>{/if}
	<Content />
</article>
