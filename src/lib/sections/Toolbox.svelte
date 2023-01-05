<script lang="ts">
	export let sortedrepos: { [key: string]: Repo[] } = {}

	import AiClose from "svelte-icons-pack/ai/AiOutlineCloseCircle";
	import SiGithub from "svelte-icons-pack/si/SiGithub";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import type { Repo } from "src/types";
	import content from "$content";
	const t = content.skills.technologies;


	interface Category {
		title: string;
		repos: typeof t.languagesAndFrameworks;
	}

	const categories: Category[] = [
		{
			title: "Languages and frameworks:",
			repos: t.languagesAndFrameworks
		},
		{
			title: "Other:",
			repos: t.other
		}
	];

	let open = false;

	let tech: { name: string; repos: Repo[] } | null = null;
	const setTech = (key: any) => {
		if (sortedrepos[key]) {
			const item = categories.flatMap((c) => c.repos).find((x) => x.id === key);
			if (!item) return;
			tech = {
				name: item.name,
				repos: sortedrepos[item.id]
			};
			open = true;
		}
	};
</script>

<h1 class="w-full pt-8 text-center text-3xl sm:text-4xl">Tools and repos:</h1>
{#each categories as c}
	<h1 class="my-8 w-full text-center text-xl sm:text-2xl">
		{c.title}
	</h1>
	<div class="mx-1 grid max-w-md grid-cols-2 gap-1 sm:mx-auto">
		{#each c.repos as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label
				for={sortedrepos[item.id]?.length ? "my-modal" : ""}
				class="btn-outline btn relative  flex-nowrap gap-2 sm:btn-lg"
				on:click={() => setTech(item.id)}
			>
				<Icon src={item.icon} color={item.color} size="2em" />
				<strong>
					{item.name}
					{#if sortedrepos[item.id]?.length}
						<span class="badge-ghost badge absolute right-0 top-0 text-black sm:badge-lg">
							{sortedrepos[item.id]?.length}
						</span>
					{/if}
				</strong>
			</label>
		{/each}
	</div>
{/each}

<input bind:value={open} type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal  cursor-pointer">
	<label class="modal-box relative overflow-x-clip" for="">
		<label for="my-modal" class="btn-circle absolute top-4 right-2 gap-2">
			<Icon color="white" src={AiClose} size="2em" />
		</label>
		{#if !!tech}
			<h3 class="text-lg font-bold">{tech.name}</h3>
			{#each tech.repos as repo}
				<div>
					<h6>
						<span>
							<a href={repo.html_url}>
								<button
									class="btn-ghost btn-md btn w-full flex-nowrap justify-start gap-4 sm:btn-lg"
								>
									<Icon color="white" src={SiGithub} size="2.25em" />
									{repo.name}
								</button>
							</a>
						</span>
					</h6>
					<pre style="margin: 4px 8px">Tags:</pre>
					<div class="flex flex-wrap gap-1">
						{#each repo.topics as t}
							<button
								class="btn-outline btn-secondary btn-sm btn"
								disabled={!categories.flatMap((c) => c.repos).some((x) => x.id === t)}
								on:click={() => setTech(t)}
							>
								<span style="white-space: nowrap">{t}</span>
							</button>
						{/each}
					</div>
				</div>
				<hr style="margin: 16px 0; border-bottom: none; border-right: none; border-left: none" />
			{/each}
		{:else}
			<span class="loading btn-circle btn-lg btn border-none bg-transparent" />
		{/if}
	</label>
</label>
