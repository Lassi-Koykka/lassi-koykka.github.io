<script lang="ts">
  import Card, { Content } from "@smui/card";

  import content from "src/content";

  type Job = {
    jobTitle: string;
    company: string;
    from: string;
    to: string;
  };

  const jobs: Job[] = content.workExperience;
</script>

<main>
  {#each content.workExperience as work}
    <Card style="margin: 0.5em 1em; text-align: center">
      <div style=" margin: 1em auto; max-width: 90%;">
        <h6 style="max-height: 2em; margin-top: 0">{work.jobTitle}</h6>
        <div style="font-size: 2.5em">{work.emoji}</div>
      </div>
      <Content>
        <div>{work.company}</div>
        <div>{work.from} - {work.to}</div>
      </Content>
    </Card>
  {/each}
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: auto;
  }

  @media (min-width: 1000px) {
    h6 {
      height: auto;
    }
  }
</style>
