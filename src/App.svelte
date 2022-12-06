<script lang="ts">
  import content from "./content";
    import About from "./lib/About.svelte";
    import Education from "./lib/Education.svelte";
    import Footer from "./lib/Footer.svelte";
    import Hero from "./lib/Hero.svelte";
    import Toolbox from "./lib/Toolbox.svelte";
    import Work from "./lib/Work.svelte";
  const { subtitles, links, city } = content;

</script>

<main class="snap-y max-w-screen max-h-screen overflow-x-hidden overflow-y-scroll flex flex-col gap-4">
  <div id="hero" class="snap-start h:auto">
    <Hero/>
  </div>
  <div id="#about" class="snap-start w-screen ">
    <About/>
  </div>
  <div id="#tools" class="snap-start w-screen">
    <Toolbox/>
  </div>
  <div id="#work" class="snap-start w-screen">
    <Work/>
  </div>
  <div id="#education" class="snap-start w-screen">
    <Education/>
  </div>
  <div class="snap-end w-screen">
    <Footer/>
  </div>
</main>

<style>
</style>
