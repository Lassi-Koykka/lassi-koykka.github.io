<script lang="ts">
  export let steps: { label: string, id: string } []
  export let curStep = 0
  let clazz = ""
  export {clazz as class}
</script>

<ul class={"steps steps-vertical " + clazz} style="transform-origin: 50% 50%">
  {#each steps as step, i}
  <li class={"step" + (i <= curStep ? " step-accent" : "")}><a class="underline hover:text-accent-focus" href={"#" + step.id}>{step.label}</a></li>
  {/each}
</ul>
