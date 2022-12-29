<script lang="ts">
    import About from "$lib/sections/About.svelte";
  import Education from "$lib/sections/Education.svelte";
  import Footer from "$lib/sections/Footer.svelte";
  import Hero from "$lib/sections/Hero.svelte";
  import Toolbox from "$lib/sections/Toolbox.svelte";
  import Work from "$lib/sections/Work.svelte";
</script>

<main class="snap-y max-w-screen max-h-screen overflow-x-hidden overflow-y-scroll flex flex-col gap-4">
  <div id="hero" class="h:auto">
    <Hero/>
  </div>
  <div id="#about" class="w-screen ">
    <About/>
  </div>
  <div id="#tools" class="w-screen">
    <Toolbox/>
  </div>
  <div id="#work" class="w-screen">
    <Work/>
  </div>
  <div id="#education" class="w-screen">
    <Education/>
  </div>
  <div class="w-screen">
    <Footer/>
  </div>
</main>

<style>
</style>
