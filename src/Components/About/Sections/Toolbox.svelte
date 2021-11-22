<script lang="ts">
  import content from "src/content";
  import Card, { Content } from "@smui/card";
  import List, { Graphic, Item, Text } from "@smui/list";
  import Icon from "svelte-icons-pack";
</script>

<main>
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">
      Languages and libraries
    </h6>
    <Content component={List}>
      {#each content.skills.technologies.LanguagesAndFrameworks as item}
        <Item>
          <Graphic>
            <Icon src={item.icon} color={item.color} size="3em" />
          </Graphic>
          <Text>{item.name}</Text>
        </Item>
      {/each}
    </Content>
  </Card>
  <Card>
    <h6 style="margin: 1em; text-decoration: underline;">Other tools</h6>
    <Content component={List}>
      {#each content.skills.technologies.other as item}
        <Item>
          <Graphic>
            <Icon src={item.icon} color={item.color} size="3em"/>
          </Graphic>
          <Text>{item.name}</Text>
        </Item>
      {/each}
    </Content>
  </Card>
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2em;
    margin: auto;
  }

  .toolsSection {
    width: min-content;
    min-width: 200px;
  }

  @media (min-width: 550px) {
    main {
      grid-template-columns: 1fr 1fr;
    }

    .toolsSectionHeader {
      height: 100%;
      max-height: 2em;
    }
  }
</style>
