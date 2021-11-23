<script lang="ts">
import Card, {Content} from "@smui/card";

    import content from "src/content";

    type Job = {
    jobTitle: string;
    company: string;
    from: string;
    to: string;
    }

    const jobs: Job[] = content.workExperience;
</script>

<main>
  {#each content.workExperience as work}
    <Card style="margin: 1em; text-align: center">
        <h6 style="height: 2em; max-width: 90%; margin: 2em auto;">{work.jobTitle}</h6>
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
