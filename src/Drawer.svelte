<script lang="ts">
  import Drawer, {
    Header,
    Title,
    Content,
    AppContent,
    Scrim,
    Subtitle,
  } from "@smui/drawer";
  import List, { Graphic, Item, Text } from "@smui/list";
  import { router } from "tinro"

  export let open: boolean;
  export let matches: boolean;

  type Page = {
    id: string;
    name: string;
    path: string;
    icon: string;
  };

  let pages: Page[] = [
    { id: "home", name: "Home", path: "/", icon: "home" },
    { id: "about", name: "Who dis?", path: "/about", icon: "person" },
    { id: "toolbox", name: "My toolbox", path: "/about/toolbox", icon: "home_repair_service" },
    { id: "work", name: "Work history", path: "/about/work", icon: "work" },
    { id: "education", name: "Education", path: "/about/education", icon: "school" },
  ];

  let active = pages.find(
    (p) => (window.location.pathname.includes(p.path))
  ) || pages[0];

  const handleClose = () => {
    open = false;
  };

  const setActive = (value: Page) => {
    active = { ...value };
    router.goto(value.path)
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
    <Subtitle>{active ? active.name : ""}</Subtitle>
  </Header>
  <Content style="">
    <List color="secondary">
      {#each pages as page}
        <Item href="javascript:void(0)" activated={active.id === page.id} on:click={() => setActive(page)}>
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
