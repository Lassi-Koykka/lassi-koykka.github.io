<script lang="ts">
	import content from "$content";
	const { education } = content;
</script>

<h1 class="w-full py-8 text-center text-3xl sm:text-4xl">Education:</h1>
<div class="mx-auto mb-4 flex flex-col justify-start gap-2 px-2">
	{#each education as e}
		<div class="card mx-auto w-full max-w-md bg-base-100 shadow-xl">
			<figure class="pt-4 text-8xl" />
			<div class="card-body">
				<h2 class="card-title mx-auto w-auto text-center">
					{e.emoji}
					{e.degree}
				</h2>
				<h2 class="card-title mx-auto text-center">
					<strong class="text text-primary" style="align-self: start">@</strong>
					{e.school}
				</h2>
				<h2 class="card-title mx-auto text-center text-accent">{e.from} - {e.to}</h2>
			</div>
		</div>
	{/each}
</div>
