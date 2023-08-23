<script>
	import Todo from "../../lib/components/Todo.svelte";
	import PlusIcon from "$lib/assets/plus.svg";
	import DeleteIcon from "$lib/assets/delete.svg";
	import todosData from "$lib/stores.js";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fly } from "svelte/transition";
	import BackButton from "$lib/components/BackButton.svelte";

	const id = $page.params.id;
	const title = $todosData[id].name;

	let value = "";
	function addTodo() {
		if (value.match(/\s*/) && !value.match(/\S+/)) return;
		const todo = {
			content: value,
			id: Date.now(),
		};

		$todosData[id].todos = [todo, ...$todosData[id].todos];
		value = "";
	}

	async function delete_() {
		await goto("/");
		setTimeout(() => {
			$todosData = Object.fromEntries(
				Object.entries($todosData).filter(([listID]) => listID != id)
			);
		}, 650); // wait for end of page transition
	}
</script>

<div
	in:fly={{ y: 0, x: "100vw", duration: 600 }}
	out:fly={{ y: 0, x: "100vw", duration: 600 }}
	style="position: fixed; width: 100vw; height: 100vh; touch-action: none;"
>
	<BackButton />
	<button class="delete" on:click={delete_}
		><img src={DeleteIcon} alt="delete" class="topIcon" /></button
	>

	<div class="header">
		<div>
			<h1>{title}</h1>
		</div>
		<div class="formElements">
			<input
				type="text"
				class="todoInput"
				on:keypress={(e) => e.key == "Enter" && addTodo()}
				bind:value
			/>
			<button class="addButton" on:click={addTodo}>
				<img class="addIcon" src={PlusIcon} alt="plus" />
			</button>
		</div>
	</div>

	<div class="todos">
		{#if $todosData[id].todos.length > 0}
			<hr />
		{/if}

		{#each $todosData[id].todos as todo (todo.id)}
			<Todo content={todo.content} ID={todo.id} />
		{/each}
	</div>
</div>

<style lang="scss">
	:global(body),
	:global(html) {
		overflow-x: hidden;
	}

	.topIcon {
		aspect-ratio: 1/1;
		width: 8vmin;
		height: auto;
	}

	.delete {
		background: none;
		border: none;
		outline: none;
		position: absolute;
		top: 5vmin;
		right: 5vmin;
		cursor: pointer;
	}

	.header {
		margin-top: 10%;
		margin-bottom: 10%;

		h1 {
			font-weight: bold;
		}

		.formElements {
			position: relative;
			display: flex;
			align-items: center;

			height: 7vh;
			width: 80vw;
			max-width: 400px;
			margin: auto;
			margin-top: 10%;

			.todoInput {
				box-sizing: border-box;
				height: 100%;
				width: auto;
				border: none;
				border-radius: 0;
				outline: none;
				font-size: 1em;
				background-color: $WHITEGREY;
				color: black;
				padding: 2vmin;
				flex: 1;
			}

			.addButton {
				box-sizing: border-box;
				border: none;
				outline: none;
				background-color: $ORANGE;
				cursor: pointer;
				height: 100%;

				img {
					aspect-ratio: 1/1;
					height: 100%;
					width: auto;
				}
			}
		}
	}

	.todos {
		$topSpace: 30%;

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

			.formElements {
				margin-top: 2.5%;
			}
		}

		.delete {
			transition: 100ms scale ease-in-out;

			&:hover {
				scale: 1.1;
			}
		}

		.todos {
			$topSpace: 40%;
			top: $topSpace;
			height: 100% - $topSpace;
		}
	}
</style>
