<script>
	import { fly } from "svelte/transition";
	import ArrowIcon from "$lib/assets/arrow_forward.svg";
	import { onMount } from "svelte";
	import QrCode from "qrcode";

	let ID;
	let canvas;
	onMount(() => {
		ID = localStorage.getItem("export-id") || new Date().getTime().toString();
		localStorage.setItem("export-id", ID);

		canvas = document.querySelector(".canvas");
		const widthFactor = window.innerWidth > 600 ? 0.4 : 0.75; // depending on mobile or desktop
		canvas.width =
			Math.min(window.innerWidth, window.innerHeight) * widthFactor;
		canvas.height = canvas.width;

		QrCode.toCanvas(canvas, ID, { width: canvas.width }, (e) => {
			if (e) console.error(e);
		});
	});
</script>

<div
	in:fly={{ y: 0, x: "100vw", duration: 600 }}
	out:fly={{ y: 0, x: "100vw", duration: 600 }}
	style="position: fixed; width: 100vw; height: 100vh; touch-action: none;"
>
	<button class="back" on:click={() => window.history.back()}
		><img src={ArrowIcon} alt="back" class="topIcon" /></button
	>

	<canvas class="canvas" />

	<div class="idDisplay">
		<h2>Your ID:</h2>
		<h2>{ID}</h2>
	</div>
</div>

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

	canvas {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}

	.idDisplay {
		position: absolute;
		bottom: 5%;
		left: 50%;
		translate: -50% -50%;
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
