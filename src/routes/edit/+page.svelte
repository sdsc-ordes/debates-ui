<script lang="ts">
	import { canEdit } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let isEditable: boolean;

	onMount(() => {
		// Set the global edit mode to true when on this page
		canEdit.set(true);

		// Retrieve the current value for debugging or usage
		isEditable = get(canEdit); // Optional, if you need a direct value
	});
</script>

<svelte:head>
	<title>Edit Mode</title>
	<meta name="description" content="Edit mode enabled" />
</svelte:head>

<section>
	<h1>Edit Mode Enabled</h1>
	<p>You can now edit fields globally in the app.</p>
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
