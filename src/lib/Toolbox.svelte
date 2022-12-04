<script lang="ts">
  import { onMount } from "svelte";
  import SiGithub from "svelte-icons-pack/si/SiGithub";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import type {Repo} from "../types"
  import content from "../content"

  const { LanguagesAndFrameworks, other } = content.skills.technologies
  let reposByTopic: { [key: string]: Repo[] } = {};
  // TODO Change to octokit and use graphql
  const getRepos = async () => {
    const reposUrl = "https://api.github.com/users/Lassi-Koykka/repos";
    const response = await fetch(reposUrl, { cache: 'no-cache'});
    const allRepos: Repo[] = await response.json();
    const repos: { [key: string]: Repo[] } = {};
    allRepos.forEach((r) => {
      const repo: Repo = {
        name: r.name,
        updated_at: r.updated_at,
        html_url: r.html_url,
        language: r.language,
        topics: r.topics,
        licence: r.licence,
      };
      repo.topics.forEach((topic) => {
        repos[topic] === undefined
          ? (repos[topic] = [repo])
          : repos[topic].push(repo);
      });
    });
    console.log(repos);
    reposByTopic = repos;
  };
  let open = false;
  let tech: { name: string; repos: Repo[] } = null;
  const setTech = (key: any) => {
    if (reposByTopic[key]) {
      const item = LanguagesAndFrameworks.find(
        (x) => x.id === key
      );
      if (!item) return;
      tech = {
        name: item.name,
        repos: reposByTopic[item.id],
      };
      open = true;
    }
  };
  onMount(getRepos);
</script>

<h1 class="w-full text-4xl text-center my-8">Toolbox:</h1>


  <h1 class="w-full text-2xl text-center my-8 underline">Languages and frameworks:</h1>
<div class="grid grid-cols-2 gap-1 mx-1 sm:mx-auto max-w-md">
  {#each LanguagesAndFrameworks as item}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <label for={reposByTopic[item.id]?.length ? "my-modal": ""} class="relative btn btn-outline sm:btn-lg gap-2" on:click={() => setTech(item.id)}>
      <Icon src={item.icon} color={item.color} size="2em" />
      <strong>
      {item.name}
      {#if reposByTopic[item.id]?.length}
        <span class="badge badge-ghost sm:badge-lg text-black absolute right-0 top-0">
          {reposByTopic[item.id]?.length}
        </span>
      {/if}
      </strong>
    </label>
  {/each}
</div>

<input bind:value={open} type="checkbox" id="my-modal" class="modal-toggle" />
<label for="my-modal" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
  {#if !!tech}
    <h3 class="text-lg font-bold">{tech.name}</h3>
    {#each tech.repos as repo}
        <div>
          <h6
            class="repo-section-header"
          >
            <span>
              <a href={repo.html_url}>
                <button
                  class="btn btn-lg btn-ghost w-full justify-start gap-4"
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
                class="btn btn-sm btn-secondary btn-outline "
                disabled={!LanguagesAndFrameworks.some(x => x.id === t)}
                on:click={() => setTech(t)}
              >
                <span style="white-space: nowrap">{t}</span>
              </button>
            {/each}
          </div>
        </div>
        <hr style="margin: 16px 0; border-bottom: none; border-right: none; border-left: none">
      {/each}
  {:else}
    <span class="btn btn-circle btn-lg bg-transparent border-none loading"/>
  {/if}
  </label>
</label>
