<script lang="ts">
  import content from "../content";
  const { workExperience } = content;
</script>

<h1 class="w-full text-3xl sm:text-4xl text-center py-8">Work experience:</h1>
<div class="flex flex-col justify-between gap-2 mx-auto px-2 mb-4">
  {#each workExperience as we}
    <div class="card max-w-md w-full mx-auto bg-base-100 shadow-xl">
      <figure class="text-8xl pt-4" />
      <div class="card-body">
        <h2 class="card-title text-center w-auto mx-auto">
          {we.emoji}
          {we.jobTitle}
        </h2>
        <h2 class="card-title text-center mx-auto">
          <strong class="text-primary" style="align-self: start">@</strong>
          {we.company}
        </h2>
        <h2 class="card-title text-accent text-center mx-auto">{we.from} - {we.to}</h2>
      </div>
    </div>
  {/each}
</div>
