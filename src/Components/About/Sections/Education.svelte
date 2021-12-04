<script lang="ts">
  import Card, { Content } from "@smui/card";

  import content from "src/content";

  type Edu = {
    school: string;
    degree: string;
    from: string;
    to: string;
  };

  const jobs: Edu[] = content.education;
</script>

<main>
  {#each content.education as edu}
    <Card style="margin: 0.5em 1em; text-align: center">
      <div style=" margin: 1em auto; max-width: 90%;">
        <h6 style="max-height: 2em; margin-top: 0">{edu.degree}</h6>
        <div style="font-size: 2.5em">{edu.emoji}</div>
      </div>
      <Content>
        <div>{edu.school}</div>
        <div>{edu.from} - {edu.to}</div>
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
