<script lang="ts">
  import Card, { Content } from "@smui/card";

  import content from "src/content.json";

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
    <Card style="margin: 1em; text-align: center">
      <h6 style="height: 2em; max-width: 90%; margin: 2em auto;">
        {edu.degree}
      </h6>
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
