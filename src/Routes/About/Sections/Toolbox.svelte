<script lang="ts">
  import Icon from "svelte-icons-pack/Icon.svelte";
  import SiGithub from "svelte-icons-pack/si/SiGithub";
  import content from "src/content";
  import Dialog, {
    Title as DialogTitle,
    Content as DialogContent,
    Actions,
  } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import IconButton from "@smui/icon-button";
  import Card, { Content } from "@smui/card";
  import List, { Item, Meta, Text } from "@smui/list";
  import { onMount } from "svelte";
  import Lazy from "svelte-lazy";
  import About from "../About.svelte";

  interface Repo {
    name: string;
    html_url: string;
    updated_at: Date;
    language: string;
    topics: string[];
    licence: {
      name: string;
    };
  }

  const { LanguagesAndFrameworks, other } = content.skills.technologies

  let reposByTopic: { [key: string]: Repo[] } = {};
  // TODO Change to octokit and use graphql
  const getRepos = async () => {
    const reposUrl = "https://api.github.com/users/Lassi-Koykka/repos";
    const response = await fetch(reposUrl);
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

  const setTech = (key) => {
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

<div class="toolbox">
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">
      Languages and libraries
    </h6>
    <Content component={List}>
      {#each LanguagesAndFrameworks as item}
        <Item on:click={() => setTech(item.id)}>
          <div class="iconContainer">
            <Icon src={item.icon} color={item.color} size="2.5em" />
          </div>
          <Text>
            <div>
              <strong>
                {item.name}
              </strong>
              <div>
                {#if reposByTopic[item.id]}
                  <Lazy>
                    {reposByTopic[item.id].length} repos on github
                  </Lazy>
                {/if}
              </div>
            </div>
          </Text>
          {#if reposByTopic[item.id]}
            <Meta class="material-icons">info_outline</Meta>
          {/if}
        </Item>
      {/each}
    </Content>
  </Card>
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">Other tools</h6>
    <Content component={List}>
      {#each other as item}
        <Item>
          <div class="iconContainer">
            <Icon src={item.icon} color={item.color} size="2.5em" />
          </div>
          <strong>{item.name}</strong>
        </Item>
      {/each}
    </Content>
  </Card>
</div>
<Dialog bind:open on:SMUIDialog:closed={() => {}}>
  {#if tech}
    <DialogTitle>My {tech.name} repos</DialogTitle>
    <DialogContent>
      {#each tech.repos as repo}
        <div>
          <h6
            class="repo-section-header"
          >
            <span>
              <IconButton href={repo.html_url}>
                <Icon src={SiGithub} />
              </IconButton>
            </span>
            <span style="color: white">
              {repo.name}
            </span>
          </h6>
          <pre style="margin: 4px 8px">Tags:</pre>
          <div class="repo-topics-section">
            {#each repo.topics as t}
              <Button
                class="button-shaped-round"
                disabled={!LanguagesAndFrameworks.some(x => x.id === t)}
                on:click={() => setTech(t)}
                variant="outlined"
              >
                <Label style="white-space: nowrap">{t}</Label>
              </Button>
            {/each}
          </div>
        </div>
        <hr style="margin: 16px 0; border-bottom: none; border-right: none; border-left: none">
      {/each}
    </DialogContent>
  {/if}
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
  </Actions>
</Dialog>

<style lang="scss">
  @use "@material/button/index" as mdc-button;

  .repo-section-header {
    margin: 0; 
    display: flex; 
    align-items: center; 
    gap: 8px
  }

  .repo-topics-section {
    display: flex; 
    align-items: center;
    gap: 8px
  }
  .toolbox {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
    padding: 0 1em;
    margin: auto;
  }

  .iconContainer {
    margin-right: 16px;
    display: flex;
    align-content: center;
  }

  @media (min-width: 550px) {
    .toolbox {
      width: 100%;
      grid-template-columns: 1fr 1fr;
    }

    // .toolsSectionHeader {
    //   height: 100%;
    //   max-height: 2em;
    // }
  }
</style>
