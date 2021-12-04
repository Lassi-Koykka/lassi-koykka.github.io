<script lang="ts">
  import MediaQuery from "svelte-media-query";
  import Paper, { Content } from "@smui/paper";
  import Fab, { Icon } from "@smui/fab";
  // Import components
  import Drawer from "./Components/Drawer.svelte";
  import Home from "./Components/Home.svelte";
  import About from "./Components/About/About.svelte";
  import Projects from "./Components/Projects.svelte";
  import { getContext, onMount } from "svelte";


  // // TODO Canvas cool stuff
  // const c = document.createElement("canvas");
  // c.style.pointerEvents = "none";
  // c.style.position = "fixed";
  // c.width = window.innerWidth;
  // c.height = window.innerHeight;
  // c.style.zIndex = "100000"
  // const ctx = c.getContext("2d");
  // ctx.strokeStyle = "#FF0000";
  // let startRotation = 0;
  // let r = 15;
  // let mouseX = 0;
  // let mouseY = 0;

  // const draw = () => {
  //   ctx.clearRect(0, 0, innerWidth, innerHeight);
  //   const endRotation = (startRotation + Math.PI) % (Math.PI * 2);
  //   ctx.beginPath();
  //   ctx.arc(mouseX, mouseY, r, startRotation, endRotation);
  //   ctx.stroke();
  //   startRotation += 0.01 * Math.PI;
  //   requestAnimationFrame(draw);
  // };

  // const handleMouseMove = (e: MouseEvent) => {
  //   e.preventDefault();
  //   mouseX = e.clientX - r / 2;
  //   mouseY = e.clientY - r / 2;
  // };

  // const isTouchDevice = () => {
  //   return (('ontouchstart' in window) ||
  //    (navigator.maxTouchPoints > 0));
  // }

  // onMount(() => {
  //   // Add cursor canvas
  //     const bodyElement = document.getElementsByTagName("body")[0];
  //     bodyElement.style.overflow = "none";
  //     bodyElement.appendChild(c);
  //     window.addEventListener("mousemove", handleMouseMove);
  //     draw();
  // });

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
  <Drawer {matches} bind:open={drawerOpen} bind:active>
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
        {:else if active.id === "projects"}
          <Projects />
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
