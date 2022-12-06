<script lang="ts">
  import content from "../content"
  const {description} = content
</script>
<div class="flex flex-col justify-between">
  <h1 class="w-full text-3xl sm:text-4xl text-center py-8">About me:</h1>
  <div class="w-full max-w-xl p-4 flex flex-col gap-4 mx-auto">
    {#each description as block}
      <p>
        {@html block}
      </p>
    {/each}
  </div>
</div>
