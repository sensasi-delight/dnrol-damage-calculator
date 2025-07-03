<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import Label from '../ui/label/label.svelte';
	import minAtk1Img from './assets/min-atk-1.png';
	import minAtk2Img from './assets/min-atk-2.png';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Label for="min-attack" class="cursor-pointer"
			>Min Base Attack * <Info class="h-4 w-4 text-blue-400" /></Label
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>MIN BASE ATTACK and MAX BASE ATTACK</Dialog.Title>

			<Dialog.Description class="max-h-96 space-y-2 overflow-y-auto">
				<p>
					If your character is using magical attack, you need to input your magical attack in the
					input stats in the calculator. your total damage will be affected by your min and max
					attack.
				</p>

				<img src={minAtk1Img} alt="Min and Max Base Attack 1" class="my-4 w-full" />
				<img src={minAtk2Img} alt="Min and Max Base Attack 2" class="my-4 w-full" />

				<p>
					<b>Note:</b> The RNG (Random number Generation) function of the game will pick between your
					Min base attack and Max base attack to determine your base attack when attacking. This is the
					reason why your damage when attacking a monster will vary from different numbers.
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
