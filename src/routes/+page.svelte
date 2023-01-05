<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  const { repos } = data;

  import About from "$lib/sections/About.svelte";
  import Education from "$lib/sections/Education.svelte";
  import Footer from "$lib/sections/Footer.svelte";
  import Hero from "$lib/sections/Hero.svelte";
  import Toolbox from "$lib/sections/Toolbox.svelte";
  import Work from "$lib/sections/Work.svelte";
  import Stepper from "$lib/components/stepper.svelte";

const Visible = (element: Element) => {
    const rect = element.getBoundingClientRect();
  return (rect.top + rect.height / 2 <= (window.innerHeight));
}

const steps: { label: string, id: string }[] = 
  [
    { label: "Start", id: "hero"},
    { label: "About me", id: "about"},
    { label: "Toolbox", id: "tools"},
    { label: "Work", id: "work"},
    { label: "Education", id: "education"},
  ]
  
let curStep = 0

const getCurStep = () => {
  curStep = steps.reduce((prev, step, idx) => {
      const element = document.getElementById(step.id)
      return element && Visible(element) ? idx : prev
  }, 0)
}

</script>

<svelte:head>
  <title>Lassi Köykkä | Full-stack developer</title>
</svelte:head>

<main class="snap-y max-w-screen max-h-screen overflow-x-hidden overflow-y-scroll flex flex-col gap-4" on:scroll={getCurStep}>
  <Stepper class="origin-center text-xl fixed left-12 top-1/3 hidden lg:block" {steps} {curStep} />
  <div id="hero" class="h:auto">
    <Hero/>
  </div>
  <div id="about" class="w-screen ">
    <About/>
  </div>
  <div id="tools" class="w-screen">
    <Toolbox sortedrepos={repos}/>
  </div>
  <div id="work" class="w-screen">
    <Work/>
  </div>
  <div id="education" class="w-screen">
    <Education/>
  </div>
  <div class="w-screen">
    <Footer/>
  </div>
</main>
