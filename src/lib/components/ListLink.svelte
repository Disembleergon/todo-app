<script>
	import ArrowIcon from "$lib/assets/arrow_forward.svg";
	import { fly } from "svelte/transition";

	export let listName;
	export let ID;
</script>

<div class="listLink" in:fly={{y: 0, x: "-100vw", duration: 600}}>
	<div class="listTitleDiv">
		<p class="listTitle">{listName}</p>
	</div>
	<div class="arrowDiv">
		<a href="/{ID}">
			<img src={ArrowIcon} alt="arrow" class="arrow" />
		</a>
	</div>
</div>

<style lang="scss">
	.listLink {
		position: relative;
		margin-bottom: 5%;

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
