<script lang="ts">
  import content from "src/content";
</script>

<div class="text">
  {#each content.description as block}
    <p>
      {@html block}
    </p>
  {/each}
</div>

<style lang="scss">
  .text {
    padding: 0 1em;
    font-family: "Roboto";
    font-size: large;
    text-align: justify;
    max-width: 500px;
    margin: auto;
  }

  @media (min-width: 550px) {
    .text {
      text-align: start;
    }
  }
</style>
