<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import Label from '../ui/label/label.svelte';
	import elementalImg from './assets/elemental.png';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Label for="elemental" class="cursor-pointer"
			>Elemental Damage (%) <Info class="h-4 w-4 text-blue-400" /></Label
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="space-y-2">
			<Dialog.Title>Elemental Damage</Dialog.Title>

			<Dialog.Description class="space-y-2">
				<p>
					The base element of your character will determine what element you should use in the
					calculator, or if you are using empowerment potential. This is also a bonus stat the
					increases your Total damage, the higher the percentage of your element stat the higher you
					damage bonus from the element.
				</p>

				<img src={elementalImg} alt="Elemental Damage Stat in Percent" class="my-4 w-full" />

				<p>
					<b>Note:</b> If you have empowerment potential, it will be automatically deducted from your
					stats info. But if you are planning to use light empowerment and buffs to increase your element
					stats, for example the buff of the priest which increase light Element % by 10 percent and
					the paladin buff for 5% light element increase, the calculator will automatically calculate
					for it, just enable it first in the buff selection cell.
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
