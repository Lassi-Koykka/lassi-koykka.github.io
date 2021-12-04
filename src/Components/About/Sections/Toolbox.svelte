<script lang="ts">
  import content from "src/content";
  import Card, { Content } from "@smui/card";
  import List, { Item, Text, PrimaryText, SecondaryText } from "@smui/list";
  import LinearProgress from "@smui/linear-progress";
  import Icon from "svelte-icons-pack";
  import { onMount } from "svelte";

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

  onMount(getRepos);
</script>

<div class="toolbox">
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">
      Languages and libraries
    </h6>
    <Content component={List}>
      {#each content.skills.technologies.LanguagesAndFrameworks as item}
        <Item>
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
                  {reposByTopic[item.id].length} repos on github
                {:else}
                  <LinearProgress indeterminate/>
                {/if}
              </div>
            </div>
          </Text>
        </Item>
      {/each}
    </Content>
  </Card>
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">Other tools</h6>
    <Content component={List}>
      {#each content.skills.technologies.other as item}
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

<style lang="scss">
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
