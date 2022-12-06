<script lang="ts">
  import content from "../content";
  const { education } = content;
</script>

<h1 class="w-full text-3xl sm:text-4xl text-center py-8">Education:</h1>
<div class="flex flex-col justify-start gap-2 mx-auto px-2 mb-4">
  {#each education as e}
    <div class="card max-w-md w-full mx-auto bg-base-100 shadow-xl">
      <figure class="text-8xl pt-4" />
      <div class="card-body">
        <h2 class="card-title text-center w-auto mx-auto">
          {e.emoji}
          {e.degree}
        </h2>
        <h2 class="card-title text-center mx-auto">
          <strong class="text-primary text" style="align-self: start">@</strong>
          {e.school}
        </h2>
        <h2 class="card-title text-accent text-center mx-auto">{e.from} - {e.to}</h2>
      </div>
    </div>
  {/each}
</div>
