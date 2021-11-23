<script lang="ts">
  import Fab, { Label, Icon } from "@smui/fab";

  import Description from "./Sections/Description.svelte";
  import Education from "./Sections/Education.svelte";
  import Toolbox from "./Sections/Toolbox.svelte";
  import Work from "./Sections/Work.svelte";

  type choice = {
    id: "description" | "toolbox" | "work" | "education";
    name: String;
    icon: String;
  };

  const choices: choice[] = [
    { id: "description", name: "Who dis?", icon: "description" },
    { id: "toolbox", name: "My toolbox", icon: "home_repair_service" },
    { id: "work", name: "Work history", icon: "work" },
    { id: "education", name: "Education", icon: "school" },
  ];

  let selected = choices[0];
</script>

<main>
  <div class="imgContainer">
    <img
      class="img"
      src="https://avatars.githubusercontent.com/u/47752198"
      alt="MyPic"
    />
  </div>
  <div class="sectionButtonsContainer">
    {#each choices as section}
      <span class="sectionButton">
        <Fab
          color="primary"
          style="width: 95%; margin: 0.5em"
          extended
          on:click={() => {
            selected = {...section};
          }}
        >
          <Icon class="material-icons" disabled={selected.id === section.id}>
            {section.icon}
          </Icon>
          <Label>{section.name}</Label>
        </Fab>
      </span>
    {/each}
  </div>
  <h3 style="margin: 0 auto">{selected.name}</h3>
  {#if selected.id === "description"}
    <Description />
  {:else if selected.id === "toolbox"}
    <Toolbox />
  {:else if selected.id === "work"}
    <Work />
  {:else if selected.id === "education"}
    <Education />
  {:else}
    <Description />
  {/if}
</main>

<style lang="scss">
  main {
    display: grid;
    gap: 2em;
  }

  .imgContainer {
    margin-top: 1em;
    width: auto;
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

  .sectionButton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sectionButtonsContainer {
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
  }

  @media (min-width: 350px) {
    .img {
      width: auto;
      height: auto;
    }

    .sectionButtonsContainer {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1000px) {
    .sectionButtonsContainer {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      text-align: center;
    }
  }
</style>
