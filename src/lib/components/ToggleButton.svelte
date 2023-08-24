<script>
	import { fade } from "svelte/transition";
	import { exportTodos, listsData } from "$lib/stores.js";

	export let icon1;
	export let icon2;
	export let ID;

	const addToggleTodoList = () => {
		$exportTodos[ID] = $listsData[ID];
	};

	const removeToggleTodoList = () => {
		delete $exportTodos[ID];
	};

	let toggled = false;
	$: toggled ? addToggleTodoList() : removeToggleTodoList();
</script>

<button on:click={() => (toggled = !toggled)}>
	{#if toggled}
		<img src={icon1} alt="" transition:fade={{ duration: 150 }} />
	{:else}
		<img src={icon2} alt="" transition:fade={{ duration: 150 }} />
	{/if}
</button>

<style lang="scss">
	button {
		appearance: none;
		background: none;
		border: none;
		outline: none;
		cursor: pointer;
		width: 100%;
		height: 100%;

		img {
			aspect-ratio: 1/1;
			width: 40%;
			height: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			translate: -50% -50%;
		}
	}
</style>
