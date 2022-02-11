<script lang="ts">
  import MediaQuery from "svelte-media-query";
  import { router, Route } from "tinro";
  import Fab, { Icon } from "@smui/fab";
  // Import components
  import Drawer from "./Drawer.svelte";
  import Home from "./Routes/Home.svelte";
  import About from "./Routes/About/About.svelte";
  import Projects from "./Routes/Projects.svelte";
  if(!location.host.includes("localhost")) router.base('/new');

  let drawerOpen = false;
</script>

<MediaQuery query="(min-width: 1281px)" let:matches>
  <Drawer {matches} bind:open={drawerOpen}>
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
    <div class="maindiv">
      <Route path="/about/*">
        <About />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </div>
  </Drawer>
</MediaQuery>

<style lang="scss">
  .maindiv {
    display: grid;
    align-content: center;

    width: 100% !important;
    max-width: 1000px;
    height: 100%;
    margin: auto;
  }

  @media (orientation: landscape) {
    .maindiv {
      width: max-content;
    }
  }
</style>
