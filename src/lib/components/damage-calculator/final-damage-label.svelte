<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import Label from '../ui/label/label.svelte';
	import fdImg from './assets/fd.png';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Label for="final-damage" class="cursor-pointer"
			>Final Damage (%) <Info class="h-4 w-4 text-blue-400" /></Label
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="space-y-2">
			<Dialog.Title>Final Damage</Dialog.Title>

			<Dialog.Description class="space-y-2">
				<p>
					This is a bonus stat that increase your Total damage base on the percentage of your total
					damage output. The higher your final damage the higher the bonus damage.
				</p>

				<img src={fdImg} alt="Final Damage Stat in Percent" class="my-4 w-full" />

				<p>
					<b>Note:</b> you need to click your <b>FINAL DMG</b> stats to be able to view the total of
					FINAL DMG in percent.
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
