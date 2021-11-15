<script lang="ts">
  import MediaQuery from "svelte-media-query";
  import Paper, { Content } from "@smui/paper";
  import Fab, { Icon } from "@smui/fab";
  // Import components
  import Drawer from "./Components/Drawer.svelte";
  import Home from "./Components/Home.svelte";
import About from "./Components/About.svelte";
  let drawerOpen = false;
</script>

<MediaQuery query="(min-width: 1281px)" let:matches>
  <Drawer {matches} bind:open={drawerOpen}>
    <Fab
      style="position: fixed;"
      color="primary"
      on:click={() => (drawerOpen = !drawerOpen)}
    >
      <Icon class="material-icons" on:click={() => (drawerOpen = !drawerOpen)}>
        {#if !drawerOpen}
          menu
        {:else}
          close
        {/if}
      </Icon>
    </Fab>
    <main>
      <div class="maindiv">
        <!-- <Home /> -->
        <About />
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
    margin: auto
  }

  @media (orientation: landscape) {
    main {
      width: max-content;
    }
  }
</style>
