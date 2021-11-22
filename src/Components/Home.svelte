<script lang="ts">
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import SiLinkedin from "svelte-icons-pack/si/SiLinkedin";
  import SiGithub from "svelte-icons-pack/si/SiGithub";  

  import content from "src/content.json";
  const brr = "<br><br><br>...";
</script>

<main>
  <div class="mainImageContainer">
    <img src="img/apu-logo.svg" alt="Apustaja" class="mainImage" />
  </div>
  <div class="name">{content.name}</div>
  <div class="title">{content.title}</div>
  <code class="code">Code goes <wbr>{brr}</code>
  <div class="icons">
    <a href={content.links.github}>
      <Icon src={SiGithub} color="#fff"/>
    </a>
    <a href={content.links.linkedin}>
      <Icon src={SiLinkedin} color="#fff"/>
    </a>
  </div>
</main>

<style lang="scss">
  $breakpoint-phone: 768px;

  main {
    display: grid;
    gap: 2em;
    text-align: center;
  }

  .code {
    color: "white";
    font-size: 2rem;
    width: auto;
    height: auto;
    text-align: left;
    margin: auto;
    border-radius: 8px;
    padding: 0.5em;
    background: #2d2c30;
  }

  .name {
    font-size: 4em;
    line-height: 1em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-shadow: 2px 2px 2px black;
  }
  .title {
    font-size: 2em;
    line-height: 1em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    text-shadow: 2px 2px 2px black;
  }

  .mainImageContainer {
    display: grid;
    align-content: center;
    height: 100%;
    margin-bottom: 32px;
  }

  .mainImage {
    max-width: 80%;
    max-height: 50vh;
    margin: auto;
    min-height: 150px;
  }

  .icons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    color: white;
    font-size: 4em;
  }

  @media (max-width: $breakpoint-phone) {
    @media (orientation: landscape) {
      main {
        gap: 1em;
      }
      .mainImage {
        max-height: 30vh;
        max-width: none;
      }
    }
    main {
        gap: 1em;
      }

    .title {
      font-size: 1.7rem;
    }
    .code {
        font-size: 1.5rem;
      }
    .name {
      font-size: 3rem;
      line-height: 2.6rem;
      font-weight: 400;
    }
  }
</style>
