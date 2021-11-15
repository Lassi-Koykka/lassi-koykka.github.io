<script lang="ts">
  import SegmentedButton, {
    Segment,
    Icon,
    Label,
  } from "@smui/segmented-button";

  import content from "src/content.json";

  type choice = { name: String; icon: String };

  const choices: choice[] = [
    { name: "Who dis?", icon: "description" },
    { name: "My toolbox", icon: "home_repair_service" },
    { name: "Work history", icon: "work" },
    { name: "Education", icon: "school" },
  ];

  let selected: choice = choices[0];
</script>

<main>
  <div class="imgContainer">
    <img
      class="img"
      src="https://avatars.githubusercontent.com/u/47752198"
      alt="MyPic"
    />
  </div>
  <SegmentedButton
    segments={choices}
    let:segment
    singleSelect
    bind:selected
    style="max-width: 100vw; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr;"
  >
    <Segment
      {segment}
      on:click$preventDefault{}
      style="min-height: 3em"
    >
      <Icon class="material-icons" style="width: 1em; height: auto;">
        {segment.icon}
      </Icon>
      <Label style="margin: auto">{segment.name}</Label>
    </Segment>
  </SegmentedButton>
  <h3 style="margin: 0 auto">{selected.name}</h3>
  <div class="text">
    {#each content.description as block}
      <p>
        {@html block}
      </p>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    display: grid;
    gap: 2em;
  }

  .imgContainer {
    margin-top: 1em;
    width: max-content;
    margin: auto;
    max-width: 500px;
  }

  .img {
    width: 100%;
    max-width: 300px;
    max-height: 50vh;
    margin: auto;
    border-radius: 50%;
  }

  .text {
    padding: 0 1em;
    font-family: "Roboto";
    font-size: large;
    text-align: justify;
    max-width: 500px;
  }

  @media (min-width: 550px) {
    .text {
      text-align: start;
    }
  }

  @media (min-width: 350px) {
    .img {
      width: auto;
      height: auto;
    }
  }
</style>
