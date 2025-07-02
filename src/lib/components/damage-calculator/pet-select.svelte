<script lang="ts">
	// vendors
	import { titleCase } from 'title-case';
	// uis
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	// data
	import { petNames } from '$lib/dataset/pets';

	let {
		value = $bindable()
	}: {
		value?: (typeof petNames)[number];
	} = $props();
</script>

<Label for="pet">Pet</Label>
<Select type="single" bind:value name="pet">
	<SelectTrigger class="w-full">{value ? titleCase(value) : 'Choose your pet'}</SelectTrigger>
	<SelectContent>
		{#each petNames as petName}
			<SelectItem value={petName}>{titleCase(petName)}</SelectItem>
		{/each}
	</SelectContent>
</Select>
