<script>
	import Header from "./Header.svelte";
	import "../app.css";
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<div class="app">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			powered by <a href="https://kit.svelte.dev">kit.svelte.dev</a> and
			<a href="https://solr.apache.org/">Apache Solr</a>
		</p>
	</footer>
</div>

<style>
	
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 80rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

</style>
