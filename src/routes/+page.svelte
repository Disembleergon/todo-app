<script>
	import PlusIcon from "$lib/assets/plus.svg";
	import ExportIcon from "$lib/assets/export.svg";
	import ImportIcon from "$lib/assets/import.svg";
	import DoneIcon from "$lib/assets/done.svg";
	import CancelIcon from "$lib/assets/cancel.svg";
	import ListLink from "../lib/components/ListLink.svelte";
	import { listsData, exportTodos } from "$lib/stores.js";
	import { fly, fade } from "svelte/transition";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { database } from "$lib/firebase.js";
	import { ref, onValue } from "firebase/database";

	function addList() {
		const input = prompt("Name of the list:");
		// check if input text is not empty
		if (input.match(/\s*/) && !input.match(/\S+/)) return;
		if (input in $listsData) {
			alert("List already exists!");
			return;
		}

		const CHARACTER_LIMIT = 15;
		if (input.length > CHARACTER_LIMIT) {
			alert("This name is too long!");
		}

		const ID = Date.now();
		$listsData[ID] = { name: input, todos: [] };
	}

	let choosingTodos = false;
	async function exportClick() {
		if (!choosingTodos) {
			$exportTodos = {};
			choosingTodos = true;
			return;
		}

		console.log($exportTodos);
		await goto("/export");
	}

	async function addImportedLists(imported) {
		for (const [_, value] of Object.entries(imported)) {
			const ID = Date.now();
			$listsData[ID] = structuredClone(value);
		}
		await goto("/");
	}

	onMount(() => {
		const ID = $page.url.searchParams.get("importID");
		if (!ID) return;

		onValue(ref(database, ID), (snapshot) => {
			const data = snapshot.val();
			if (data) addImportedLists(data);
		});
	});
</script>

<div
	in:fly={{ y: 0, x: "-100vw", duration: 600 }}
	out:fly={{ y: 0, x: "-100vw", duration: 600 }}
	style="position: fixed; width: 100vw; height: 100vh; touch-action: none;"
>
	{#if choosingTodos}
		<div class="greyout" transition:fade />
	{/if}

	<button class="export" on:click={exportClick}>
		{#if !choosingTodos}
			<img
				src={ExportIcon}
				alt="export"
				class="topIcon"
				in:fade={{ delay: 200 }}
			/>
		{:else}
			<img src={DoneIcon} alt="done" class="topIcon" in:fade={{ delay: 200 }} />
		{/if}
	</button>

	{#if !choosingTodos}
		<a href="/import" class="import" in:fade={{ delay: 200 }}>
			<img src={ImportIcon} alt="import" class="topIcon" />
		</a>
	{:else}
		<button
			class="cancel"
			on:click={() => (choosingTodos = false)}
			in:fade={{ delay: 200 }}
		>
			<img src={CancelIcon} alt="cancel" class="topIcon" />
		</button>
	{/if}

	<div class="header">
		<div>
			<h1>Todo-App</h1>
		</div>
		<div>
			<button class="addButton" on:click={addList}>
				<img class="addIcon" src={PlusIcon} alt="plus" />
			</button>
		</div>
	</div>

	<div class="listsDiv">
		<!--reverse, so new lists are at the top-->
		{#each Object.entries($listsData).reverse() as [ID, list] (ID)}
			<ListLink listName={list.name} {ID} {choosingTodos} />
		{/each}
	</div>
</div>

<!--#####################################-->

<style lang="scss">
	.export,
	.cancel {
		appearance: none;
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
		position: absolute;
		top: 5vmin;
		left: 5vmin;
	}

	.import,
	.cancel {
		position: absolute;
		left: auto !important;
		top: 5vmin;
		right: 5vmin;
	}

	.topIcon {
		aspect-ratio: 1/1;
		width: 10vmin;
		height: auto;
	}

	.header {
		margin-top: 20%;
		margin-bottom: 10%;

		h1 {
			font-weight: bold;
		}

		.addButton {
			border: none;
			outline: none;
			border-radius: 10px;
			background-color: $ORANGE;
			cursor: pointer;
			margin-top: 4%;
			transition: transform 100ms ease-in-out;

			&:active {
				transform: scale(0.9);
			}

			.addIcon {
				aspect-ratio: 1/1;
				width: 15vmin;
				height: auto;
			}
		}
	}

	.listsDiv {
		$topSpace: 35%;

		position: absolute;
		top: $topSpace;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100% - $topSpace;
	}

	.greyout {
		z-index: 0;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #0e0e0eb0;
		transition: 250ms ease-in-out;
	}

	@media only screen and (min-width: 600px) {
		.header {
			margin-top: 5%;
			margin-bottom: 5%;

			.addButton {
				margin-top: 2%;

				.addIcon {
					width: 8vmin;
				}
			}
		}

		.topIcon {
			width: 8vmin;
			z-index: 5;

			&:hover {
				scale: 1.1;
			}
		}

		.listsDiv {
			$topSpace: 35%;
			top: $topSpace;
			height: 100% - $topSpace;
		}
	}
</style>
