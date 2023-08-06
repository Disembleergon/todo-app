<script>
	import Todo from "../../lib/components/Todo.svelte";
	import PlusIcon from "$lib/assets/plus.svg";
	import todosData from "$lib/stores.js";
	import { page } from "$app/stores";

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
</script>

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

<style lang="scss">
	:global(body),
	:global(html) {
		overflow-x: hidden;
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

	@media only screen and (min-width: 600px) {
		.header {
			margin-top: 5%;
			margin-bottom: 5%;

			.formElements {
				margin-top: 2.5%;
			}
		}
	}
</style>
