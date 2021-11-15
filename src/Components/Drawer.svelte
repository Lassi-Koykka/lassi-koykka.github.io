<script lang="ts">
  import Drawer, {
    Header,
    Title,
    Content,
    AppContent,
    Scrim,
Subtitle,
  } from "@smui/drawer";
  import IconButton from "@smui/icon-button";
  import List, { Graphic, Item, Text } from "@smui/list";
  export let open: boolean;
  export let matches: boolean;
  let active = "Home";

  let pages = [
    { name: "Home", icon: "home" },
    { name: "About me", icon: "person" },
    { name: "Projects", icon: "handyman" },
    { name: "Contact", icon: "mail" },
  ];

  const setActive = (value: string) => {
    active = value;
  };

  const handleClose = () => {
    open = false;
  };
</script>

<Drawer
  style="position: fixed; top: 0"
  variant={matches ? "dismissible" : "modal"}
  onclose={handleClose}
  bind:open
>
  <Header class="material-icons">
    <Title>Lassi Köykkä</Title>
    <Subtitle>{active}</Subtitle>
  </Header>
  <Content style="">
    <List color="secondary">
      {#each pages as page}
        <Item
          href="javascript:void(0)"
          on:click={() => setActive(page.name)}
          activated={active === page.name}
        >
          <Graphic class="material-icons">{page.icon}</Graphic>
          <Text>{page.name}</Text>
        </Item>
      {/each}
    </List>
  </Content>
</Drawer>
{#if !matches}
  <Scrim fixed={true} color="secondary" />
{/if}
<AppContent class="app-content">
  <slot />
</AppContent>
