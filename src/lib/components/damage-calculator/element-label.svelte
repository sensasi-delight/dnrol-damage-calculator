<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Info } from '@lucide/svelte';
	import Label from '../ui/label/label.svelte';
	import elementImg from './assets/element.png';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Label for="element" class="cursor-pointer"
			>Element/Empowerment<Info class="h-4 w-4 text-blue-400" /></Label
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header class="space-y-2">
			<Dialog.Title>Element/Empowerment</Dialog.Title>

			<Dialog.Description class="space-y-2">
				<p>
					Select your element used, if you have light empowerment select light, and fire if you have
					fire empo, etc… In built element in the skills like EL's fire and ice skills, priest and
					paladin's light skills, and Force User's dark skills, you should select the appropriate
					element for each skill if you don't have empowerment.
				</p>

				<img src={elementImg} alt="Element Damage Stat in Percent" class="my-4 w-full" />

				<p>
					<b>Note:</b> Manticore weapons has in built dark element Empowerment, so pick dark if you have
					manticore weapons except if you have empowerment on your main weapon.
				</p>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
