<script lang="ts">
	import content from "$content";
	const { description } = content;
</script>

<div class="flex flex-col justify-between">
	<h1 class="w-full py-8 text-center text-3xl sm:text-4xl">About me:</h1>
	<div class="mx-auto flex w-full max-w-xl flex-col gap-4 p-4">
		{#each description as block}
			<p>
				{@html block}
			</p>
		{/each}
	</div>
</div>
