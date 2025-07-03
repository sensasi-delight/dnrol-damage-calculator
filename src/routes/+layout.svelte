<script lang="ts">
	import { GithubIcon } from '@lucide/svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 pb-12 md:p-12 md:pb-12">
	{@render children()}

	<footer class="mt-24">
		<div class="mb-1 flex items-center justify-center gap-1">
			<div class="text-xs text-slate-400">DNROL Damage Calculator</div>
			<a
				class=" text-blue-400 hover:text-blue-600 hover:underline"
				href="https://github.com/sensasi-delight/dnrol-damage-calculator"
			>
				<GithubIcon class="h-4 w-4" /></a
			>
		</div>

		<div class="flex items-center justify-center gap-2">
			<div class="text-xs text-slate-400">made with ❤️ by</div>
			<a
				class="text-xs text-blue-400 hover:text-blue-600 hover:underline"
				href="https://sensasi-delight.web.app">Sensasi Delight</a
			>
		</div>
	</footer>
</div>
