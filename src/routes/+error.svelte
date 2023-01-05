<script>
	import { page } from "$app/stores";
</script>

<div class="text-1xl grid h-screen items-center text-center md:text-3xl">
	<div class="m-auto max-w-lg p-2">
		<h1 class="mb-12">{$page.status} <br />-<br /> {$page.error?.message}</h1>
		{#if $page.status !== 404}
			<h1>
				Oof, it would seem that something went horribly wrong.<br />---<br />Please report this
				error to
				<pre>me@lassi-koykka.fi</pre>
			</h1>
		{:else}
			<h1>No website here I'm afraid :(</h1>
		{/if}
		{#if $page.url.pathname !== "/"}
			<a href="/" class="btn-lg btn mt-12 hover:bg-accent hover:text-black"
				>Return to the front page</a
			>
		{/if}
	</div>
</div>
