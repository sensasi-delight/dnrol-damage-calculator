<script lang="ts">
	// vendors
	import { titleCase } from 'title-case';
	// uis
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Label } from '$lib/components/ui/label';
	// data
	import { petNames } from '$lib/dataset/pets';

	let { value: selectedPet } = $props();
</script>

<Label for="pet">Choose Your Pet</Label>
<Select type="single" bind:value={selectedPet}>
	<SelectTrigger class="w-full">{selectedPet ? titleCase(selectedPet) : 'Select pet'}</SelectTrigger
	>
	<SelectContent>
		{#each petNames as petName}
			<SelectItem value={petName}>{titleCase(petName)}</SelectItem>
		{/each}
	</SelectContent>
</Select>
