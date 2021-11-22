<script lang="ts">
  import MediaQuery from "svelte-media-query";
  import Paper, { Content } from "@smui/paper";
  import Fab, { Icon } from "@smui/fab";
  // Import components
  import Drawer from "./Components/Drawer.svelte";
  import Home from "./Components/Home.svelte";
  import About from "./Components/About/About.svelte";

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
  
  let active = pages[0];
  let drawerOpen = false;
</script>

<MediaQuery query="(min-width: 1281px)" let:matches>
  <Drawer {matches} bind:open={drawerOpen} bind:active={active}>
    <Fab
      style="position: fixed; z-index: 999"
      color="primary"
      on:click={() => (drawerOpen = !drawerOpen)}
    >
      <Icon class="material-icons">
        {#if !drawerOpen}
          menu
        {:else}
          close
        {/if}
      </Icon>
    </Fab>
    <main>
      <div class="maindiv">
        {#if active.id === "home"}
          <Home />
        {:else if active.id === "about"}
          <About />
        {:else}
          <Home />
        {/if}
      </div>
    </main>
  </Drawer>
</MediaQuery>

<style lang="scss">
  main {
    display: grid;
    align-content: center;

    width: 100% !important;
  }

  .maindiv {
    max-width: 1000px;
    height: 100%;
    margin: auto;
  }

  @media (orientation: landscape) {
    main {
      width: max-content;
    }
  }
</style>
