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
  
  type Page = {
    id: string;
    name: string;
    icon: string;
  };
  
  let pages: Page[] = [
    { id: "home", name: "Home", icon: "home" },
    { id: "about", name: "About me", icon: "person" },
    { id: "projects", name: "Projects", icon: "handyman" },
    { id: "contact", name: "Contact", icon: "mail" },
  ];
  
  export let active;
  
  const handleClose = () => {
    open = false;
  };

  const setActive = (value: Page) => {
    active = {...value};
    !matches && handleClose();
  };

</script>

<Drawer
  style="position: fixed; top: 0; z-index: 1000"
  variant={matches ? "dismissible" : "modal"}
  onclose={handleClose}
  bind:open
>
  <Header class="material-icons">
    <Title>Lassi Köykkä</Title>
    <Subtitle>{active.name}</Subtitle>
  </Header>
  <Content style="">
    <List color="secondary">
      {#each pages as page}
        <Item
          href="javascript:void(0)"
          on:click={() => setActive(page)}
          activated={active.id === page.id}
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
