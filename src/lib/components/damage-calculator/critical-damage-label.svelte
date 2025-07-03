<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import Label from '../ui/label/label.svelte';
	import critDmgImg from './assets/crit-dmg.png';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Label for="crit-damage" class="cursor-pointer"
			>Critical Damage (%) <Info class="h-4 w-4 text-blue-400" /></Label
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="space-y-2">
			<Dialog.Title>Critical Damage</Dialog.Title>

			<Dialog.Description class="space-y-2">
				<p>
					Critical damage is where a successful attack, called a critical hit, deals significantly
					more damage than a normal attack. It's expressed as a multiplier that increases the base
					damage of the attack. This increased damage is not guaranteed and is dependent on a unit's
					critical rate stat.
				</p>

				<img src={critDmgImg} alt="Critical Damage Stat in Percent" class="mt-4 w-full" />

				<p>
					<b>Note:</b> you need to click your <b>CRIT DMG</b> stats to be able to view the total of CRIT
					DMG in percent.
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
