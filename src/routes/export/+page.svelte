<script>
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import QrCode from "qrcode";
	import BackButton from "$lib/components/BackButton.svelte";

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
	<BackButton />
	<canvas class="canvas" />

	<div class="idDisplay">
		<h2>Your ID:</h2>
		<h2>{ID}</h2>
	</div>
</div>

<style lang="scss">
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
</style>
