<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		To the UNHCR Political Debates PoC
	</h1>

	<h2>
		Searching in video transcripts
	</h2>
	<ul>
		<li>Currently there is only one video available</li>
		<li>But the goal will be to add many more ...</li>
	</ul>	

</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
