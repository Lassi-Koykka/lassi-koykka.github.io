<script lang="ts">
	import { onMount } from "svelte";
    import content from "$content";
	import Icon from "svelte-icons-pack/Icon.svelte";
	import SiGithub from "svelte-icons-pack/si/SiGithub";
	import SiLinkedin from "svelte-icons-pack/si/SiLinkedin";
	import SiEmail from "svelte-icons-pack/ai/AiOutlineMail";
	const { subtitles, links, city } = content;
	const { github, linkedin } = links;

	let idx = 0;
	let i = 0;
	$: subtitle = subtitles[idx];
	let text = subtitles[0];
	const typingSpeed = 50;
	let cursor = true;

	const typing = () => {
		if (i < subtitle.length) {
			cursor = true;
			text = text + subtitle.charAt(i);
			i += 1;
			setTimeout(typing, typingSpeed);
		} else {
			setTimeout(erase, 3000);
		}
	};

	const erase = () => {
		if (text.length > 0) {
			cursor = true;
			text = text.slice(0, text.length - 1);
			setTimeout(erase, typingSpeed);
		} else {
			i = 0;
			idx = (idx + 1) % subtitles.length;
			setTimeout(typing, typingSpeed);
		}
	};
	let mailToLinkElement: HTMLAnchorElement;

	onMount(() => {
		let linkParts = ["mail", "to:", "me", "@", "lassi-koykka", ".fi"];
		mailToLinkElement.href = linkParts.join("");
		setInterval(() => (cursor = !cursor), 530);
		setTimeout(erase, 1000);
	});
</script>

<div class="hero h-auto min-h-screen">
	<div class="hero-content flex-col gap-4 text-center sm:gap-8">
		<img
			src="https://avatars.githubusercontent.com/u/47752198"
			alt="Me"
			class="w-3/5 max-w-sm rounded-full shadow-2xl sm:w-4/5"
		/>
		<div class="flex max-w-md flex-col gap-4">
			<h1 class="font-mono text-4xl font-bold text-accent sm:text-5xl">Lassi Köykkä</h1>
			<div class="flex flex-row gap-4">
				<div class="whitespace-nowrap text-3xl text-white sm:text-4xl">
					<span class="text-primary">$</span> cd
				</div>
				<code class={`h-full text-3xl text-white sm:text-4xl`}>
					{text}{cursor ? "|" : "\u00A0"}
				</code>
			</div>
		</div>
		<div class="text-2xl sm:text-3xl">
			Full-stack developer
			<div class="text-error">@</div>
			Talentree
		</div>
		<div class="flex gap-8">
			<a href={github}>
				<button class="btn-ghost btn-circle btn-lg">
					<Icon color="white" src={SiGithub} size="80%" className="m-auto" />
				</button>
			</a>
			<a href={linkedin}>
				<button class="btn-ghost btn-circle btn-lg">
					<Icon color="white" src={SiLinkedin} size="75%" className="m-auto" />
				</button>
			</a>
			<a bind:this={mailToLinkElement} href="/">
				<button class="btn-ghost btn-circle btn-lg">
					<Icon color="white" src={SiEmail} size="80%" className="m-auto" />
				</button>
			</a>
		</div>
	</div>
</div>
