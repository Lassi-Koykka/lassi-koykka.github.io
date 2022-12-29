<script lang="ts">
	import { onMount } from "svelte";
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

	let reposByTopic: { [key: string]: Repo[] } = {};
	// TODO Change to octokit and use graphql
	const getRepos = async () => {
		const reposUrl = "https://api.github.com/users/Lassi-Koykka/repos";
		const response = await fetch(reposUrl, { cache: "no-cache" });
		const allRepos: Repo[] = await response.json();
		const repos: { [key: string]: Repo[] } = {};
		allRepos.forEach((r) => {
			const repo: Repo = {
				name: r.name,
				updated_at: r.updated_at,
				html_url: r.html_url,
				language: r.language,
				topics: r.topics,
				licence: r.licence
			};
			repo.topics.forEach((topic) => {
				repos[topic] === undefined ? (repos[topic] = [repo]) : repos[topic].push(repo);
			});
		});
		console.log(repos);
		reposByTopic = repos;
	};
	let open = false;
	let tech: { name: string; repos: Repo[] } = null;
	const setTech = (key: any) => {
		if (reposByTopic[key]) {
			const item = categories.flatMap((c) => c.repos).find((x) => x.id === key);
			if (!item) return;
			tech = {
				name: item.name,
				repos: reposByTopic[item.id]
			};
			open = true;
		}
	};
	onMount(getRepos);
</script>

<h1 class="w-full pt-8 text-center text-3xl sm:text-4xl">Tools and repos:</h1>
{#each categories as c}
	<h1 class="my-8 w-full text-center text-xl underline sm:text-2xl">
		{c.title}
	</h1>
	<div class="mx-1 grid max-w-md grid-cols-2 gap-1 sm:mx-auto">
		{#each c.repos as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<label
				for={reposByTopic[item.id]?.length ? "my-modal" : ""}
				class="btn-outline btn relative  flex-nowrap gap-2 sm:btn-lg"
				on:click={() => setTech(item.id)}
			>
				<Icon src={item.icon} color={item.color} size="2em" />
				<strong>
					{item.name}
					{#if reposByTopic[item.id]?.length}
						<span class="badge-ghost badge absolute right-0 top-0 text-black sm:badge-lg">
							{reposByTopic[item.id]?.length}
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
