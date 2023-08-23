<script>
	import ArrowIcon from "$lib/assets/arrow_forward.svg";
</script>

<button class="back" on:click={() => window.history.back()}
	><img src={ArrowIcon} alt="back" class="topIcon" /></button
>

<style lang="scss">
	.back {
		background: none;
		border: none;
		outline: none;
		position: absolute;
		top: 5vmin;
		left: 5vmin;
		cursor: pointer;

		img {
			rotate: 180deg;
		}
	}

	@media only screen and (min-width: 600px) {
		.back {
			transition: 200ms transform ease-in-out;

			&:hover {
				transform: translateX(-10%);
			}
		}
	}
</style>
