<script>
	import PlusIcon from "$lib/assets/plus.svg";
	import todosData from "$lib/stores.js";
	import { page } from "$app/stores";

	export let content;
	export let ID;

	const listID = $page.params.id;
	const removeTodo = () =>
		($todosData[listID].todos = $todosData[listID].todos.filter(
			({ id }) => id != ID
		));
</script>

<div class="todo">
	<div class="contentDiv">
		<p>{content}</p>
	</div>
	<div class="removeDiv">
		<button class="removeButton" on:click={removeTodo}>
			<img src={PlusIcon} alt="remove" />
		</button>
	</div>
</div>

<hr />

<style lang="scss">
	.todo {
		width: 100vw;
		display: flex;

		.contentDiv {
			text-align: left;
			padding: 5vmin;
			flex: 1;

            p{
                line-height: 25px;
                font-weight: 500;
                word-break: break-all;
                word-wrap: break-word;
            }
		}

		.removeDiv {
			.removeButton {
				border: none;
				outline: none;
				border-radius: 0;
				background-color: $ORANGE;
				height: 100%;
				display: grid;
				place-content: center;
				cursor: pointer;

				img {
					rotate: 45deg;
				}
			}
		}
	}
</style>
