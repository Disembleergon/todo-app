<script>
	import QrScannerIcon from "$lib/assets/qr_scanner.svg";
	import PinInputIcon from "$lib/assets/pin_input.svg";
	import BackButton from "$lib/components/BackButton.svelte";
	import { fly } from "svelte/transition";
	import { goto } from "$app/navigation";

	const enterPin = async () => {
		const ID = prompt("ID to import:");
		await goto(`/?importID=${ID}`);
	};
</script>

<div
	in:fly={{ y: 0, x: "100vw", duration: 600 }}
	out:fly={{ y: 0, x: "100vw", duration: 600 }}
	style="position: fixed; width: 100vw; height: 100vh; touch-action: none;"
>
	<BackButton />

	<div class="selectionDiv">
		<button class="qrButton" on:click={async () => await goto("/scan")}>
			<img class="qrIcon" src={QrScannerIcon} alt="qr code" />
		</button>

		<button class="pinButton" on:click={enterPin}>
			<img class="pinIcon" src={PinInputIcon} alt="pin" />
		</button>
	</div>
</div>

<style lang="scss">
	.selectionDiv {
		width: 100vw;
		height: 100vh;
		padding: 40vmin;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		place-content: center;

		button {
			border: none;
			outline: none;
			border-radius: 10px;
			background-color: $ORANGE;
			cursor: pointer;
			transition: transform 100ms ease-in-out;
			padding: 3vmin;
			aspect-ratio: 1/1;
			max-width: 20vmin;
			margin: auto;

			&:active {
				transform: scale(0.9);
			}
		}
	}

	@media only screen and (min-width: 600px) {
		.selectionDiv {
			padding: 25vmin;

			button {
				padding: 2vmin;
				transition: 100ms scale ease-in-out;

				&:hover {
					scale: 1.1;
				}
			}
		}
	}
</style>
