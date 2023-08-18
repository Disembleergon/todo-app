<script>
	import PlusIcon from "$lib/assets/plus.svg";
	import ListLink from "../lib/components/ListLink.svelte";
	import listsData from "$lib/stores.js";
	import { fly } from "svelte/transition";

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
</script>

<div
	in:fly={{ y: 0, x: "-100vw", duration: 600 }}
	out:fly={{ y: 0, x: "-100vw", duration: 600 }}
	style="position: fixed; width: 100vw; height: 100vh; touch-action: none;"
>
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
			<ListLink listName={list.name} {ID} />
		{/each}
	</div>
</div>

<!--#####################################-->

<style lang="scss">
	.header {
		margin-top: 10%;
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
		$topSpace: 27%;

		position: absolute;
		top: $topSpace;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100% - $topSpace;
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

		.listsDiv {
			$topSpace: 35%;
			top: $topSpace;
			height: 100% - $topSpace;
		}
	}
</style>
