<script lang="ts">
  import Fab, { Label, Icon } from "@smui/fab";
  import { Route, router } from "tinro";
  import Lazy from "svelte-lazy";
  import Description from "./Sections/Description.svelte";
  import Education from "./Sections/Education.svelte";
  import Toolbox from "./Sections/Toolbox.svelte";
  import Work from "./Sections/Work.svelte";

  type choice = {
    path: "/" | "/toolbox" | "/work" | "/education";
    name: String;
    icon: String;
  };

  const choices: choice[] = [
    { path: "/", name: "Who dis?", icon: "description" },
    { path: "/toolbox", name: "My toolbox", icon: "home_repair_service" },
    { path: "/work", name: "Work history", icon: "work" },
    { path: "/education", name: "Education", icon: "school" },
  ];

  let selected = choices.find(
    (c) => window.location.pathname.includes(c.path)
    ) || choices[0]
</script>

<Lazy>
  <div class="aboutdiv">
    <div class="imgContainer">
      <Lazy height={300}>
        <img
          class="img"
          src="https://avatars.githubusercontent.com/u/47752198"
          alt="MyPic"
        />
      </Lazy>
    </div>
    <div class="sectionButtonsContainer">
      {#each choices as section}
        <span class="sectionButton">
          <Fab
            color="primary"
            style="width: 95%; margin: 0.5em"
            extended
            on:click={() => {
              selected = { ...section };
              router.goto(
                "/about" + (section.path !== "/" ? section.path : "")
              );
            }}
          >
            <Icon
              class="material-icons"
              disabled={selected.path === section.path}
            >
              {section.icon}
            </Icon>
            <Label>{section.name}</Label>
          </Fab>
        </span>
      {/each}
    </div>
    <h3 style="margin: 0 auto">{selected.name}</h3>
    <Route path="/">
      <Description />
    </Route>
    <Route path="/toolbox">
      <Toolbox />
    </Route>
    <Route path="/work">
      <Work />
    </Route>
    <Route path="/education">
      <Education />
    </Route>
  </div>
</Lazy>

<style lang="scss">
  .aboutdiv {
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

  @media (min-width: 500px) {
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
