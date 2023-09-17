<script>
	import ArrowIcon from "$lib/assets/arrow_forward.svg";
	import CheckedIcon from "$lib/assets/radio_checked.svg";
	import UncheckedIcon from "$lib/assets/radio_unchecked.svg";
	import ToggleButton from "$lib/components/ToggleButton.svelte";
	import { createEventDispatcher } from "svelte";
	import { fly, slide } from "svelte/transition";

	const dispatch = createEventDispatcher();

	export let choosingTodos;
	export let listName;
	export let ID;

	const REQUIRED_HOLDING_DURATION = 750;
	let holdingTimeout;

	const releasing = () => clearTimeout(holdingTimeout);
	const holding = () => {
		holdingTimeout = setTimeout(() => {
			const renamed = prompt("Rename", listName);
			if (!renamed) return;

			listName = renamed;
			dispatch("rename", { id: ID, renamed: renamed });
		}, REQUIRED_HOLDING_DURATION);
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="listLink"
	in:fly={{ y: 0, x: "-100vw", duration: 600 }}
	out:slide
	on:mousedown={holding}
	on:touchstart={holding}
	on:mouseup={releasing}
	on:touchend={releasing}
>
	<div class="listTitleDiv">
		<p class="listTitle">{listName}</p>
	</div>
	<div class="arrowDiv">
		{#if !choosingTodos}
			<a href="/{ID}">
				<img src={ArrowIcon} alt="arrow" class="arrow" />
			</a>
		{:else}
			<ToggleButton icon1={CheckedIcon} icon2={UncheckedIcon} {ID} />
		{/if}
	</div>
</div>

<style lang="scss">
	.listLink {
		position: relative;
		margin-bottom: 5%;
		z-index: 5;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;

		.listTitleDiv {
			display: inline-block;
			box-sizing: border-box;
			width: 80vw;
			max-width: 300px;
			margin: auto;
			padding: 5vmin;
			background-color: $WHITEGREY;

			p {
				color: black;
				font-weight: bold;
				text-align: left;
			}
		}

		.arrowDiv {
			position: absolute;
			display: inline-block;
			background-color: $ORANGE;
			aspect-ratio: 1/1;
			height: 100%;
			width: auto;
			translate: -100%;
			cursor: pointer;

			img {
				position: absolute;
				top: 50%;
				left: 50%;
				translate: -50% -50%;
				aspect-ratio: 1/1;
				width: 75%;
				height: auto;
			}
		}
	}

	@media only screen and (min-width: 600px) {
		.listLink {
			margin-bottom: 2.5%;

			.listTitleDiv {
				padding: 3vmin;
			}
		}

		.arrow {
			transition: transform 200ms ease-in-out;

			&:hover {
				transform: translateX(10%);
			}
		}
	}
</style>
