<script lang="ts">
  import content from "./content";
    import About from "./lib/About.svelte";
    import Hero from "./lib/Hero.svelte";
    import Projects from "./lib/Projects.svelte";
    import Toolbox from "./lib/Toolbox.svelte";
  const { subtitles, links, city } = content;

</script>

<main class="snap-y max-w-screen max-h-screen overflow-x-hidden overflow-y-scroll">
  <div class="snap-start hero min-h-screen h:auto">
    <Hero/>
  </div>
  <div class="snap-start w-screen">
    <About/>
  </div>
  <div class="snap-start min-h-screen w-screen">
    <Toolbox/>
  </div>
</main>

<style>
</style>
