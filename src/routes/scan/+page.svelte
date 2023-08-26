<script>
	import { Html5Qrcode } from "html5-qrcode";
	import { onMount, onDestroy } from "svelte";
	import { goto } from "$app/navigation";
	import BackButton from "$lib/components/BackButton.svelte";

	const qrSuccess = async (decodedText, _) => {
		await goto(`/import/${decodedText}`);
	};

	let scanner;
	onMount(() => {
		scanner = new Html5Qrcode("reader");
		const config = {
			fps: 10,
			qrBox: { width: 250, height: 250 },
		};

		scanner.start({ facingMode: "environment" }, config, qrSuccess);
	});

	onDestroy(async () => {
		await scanner.stop();
	});
</script>

<BackButton />
<div id="reader" width="100%" style="z-index: -1" />
