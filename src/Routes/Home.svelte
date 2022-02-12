<script lang="ts">
  import Ripple from "@smui/ripple";
  import Icon from "svelte-icons-pack/Icon.svelte";
  import SiLinkedin from "svelte-icons-pack/si/SiLinkedin";
  import SiGithub from "svelte-icons-pack/si/SiGithub";
  import FiMail from "svelte-icons-pack/fi/FiMail";

  import Lazy from "svelte-lazy";
  import content from "src/content";
  import { onMount } from "svelte";

  let i = 0;
  const brr = "<br><br><br>...";
  let brrText = "";
  const typingSpeed = 50;
  let cursor = true;

  const typing = () => {
    if (i < brr.length) {
      cursor = true;
      brrText = brrText.replace(" ", "").replace("|", "") + brr.charAt(i);
      i += 1;
      setTimeout(typing, typingSpeed);
    }
  };

  let mailToLinkElement: HTMLAnchorElement;

  onMount(() => {
    let linkParts = ["mail", "to:", "me", "@", "lassi-koykka", ".fi"];
    mailToLinkElement.href = linkParts.join("");
    setInterval(() => (cursor = !cursor), 530);
    setTimeout(typing, 2000);
  });
</script>

<main>
  <div class="mainImageContainer">
    <Lazy height={600}>
      <img src="img/apu-logo.svg" alt="Apustaja" class="mainImage" />
    </Lazy>
  </div>
  <div class="name">{content.name}</div>
  <div class="title">{content.title}</div>
  <pre style="margin: 0; font-size: 1.75rem">"Haha, code goes"</pre>
  <code class="code"><wbr />{brrText}{cursor ? "|" : "\u00A0"}</code>
  <div class="icons">
    <a
      href={content.links.github}
      use:Ripple={{ surface: true }}
      style="padding: 8px; border-radius: 100%"
    >
      <Icon src={SiGithub} color="#fff" />
    </a>
    <a
      href={content.links.linkedin}
      use:Ripple={{ surface: true }}
      style="padding: 8px; border-radius: 5px"
    >
      <Icon src={SiLinkedin} color="#fff" />
    </a>
    <a
      href={"javascript:void(0)}"}
      bind:this={mailToLinkElement}
      use:Ripple={{ surface: true }}
      style="padding: 8px; border-radius: 5px"
    >
      <Icon src={FiMail} color="#FFF" />
    </a>
  </div>
</main>

<style lang="scss">
  // Variables
  $breakpoint-phone: 768px;

  // Animation
  // @media (prefers-reduced-motion: no-preference) {
  //   .mainImage {
  //     animation: App-logo-spin infinite 20s linear;
  //   }
  // }

  // @keyframes App-logo-spin {
  //   from {
  //     transform: rotate(360deg);
  //   }
  //   to {
  //     transform: rotate(0deg);
  //   }
  // }

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
    grid-template-columns: 1fr 1fr 1fr;
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
