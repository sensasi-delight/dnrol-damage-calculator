<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import CardTitle from '../ui/card/card-title.svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<CardTitle class="align-center flex cursor-pointer gap-1"
			>Active Buffs <Info class="h-4 w-4 text-blue-400" /></CardTitle
		>
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header class="space-y-2">
			<Dialog.Title>Active Buffs</Dialog.Title>

			<Dialog.Description class="space-y-2">
				<p>
					If you wish to add buffs to your damage testing you can enable them in the enable buff
					section of the calculator. you can simple enable it for each buff you wish to add.
					<b>STRIKING</b>, <b>BLESSING OF LIGHT</b>, <b>CONVICTION AURA</b> and <b>BATTLE HOWL</b> are
					the only buffs that are compatible with the current version of this calculator.
				</p>

				<p>
					<b>Note:</b> <b>BLESSING OF LIGHT</b> and <b>CONVICTION AURA</b> only benefits and calculate.
					if you picked LIGHT ELEMENT in ELEMENT/EMPOWERMENT: section of the calculator..
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
