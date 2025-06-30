<script lang="ts">
	// vendors
	import { titleCase } from 'title-case';
	// uis
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';
	// data
	import buffs, { availableBuffJobs } from '$lib/dataset/buffs';

	const {
		activeBuffs
	}: {
		activeBuffs: { [key: string]: boolean };
	} = $props();
</script>

{#each availableBuffJobs as job}
	<div class="space-y-2">
		<div class="mb-1.5 text-xs font-bold text-blue-600">{titleCase(job)}'s Buffs</div>

		{#each buffs[job] as buff}
			<div class="flex items-center justify-between rounded-lg bg-slate-50 p-3">
				<Label for={buff.name.toLowerCase().replace(' ', '-')} class="grow">
					<div class="text-sm font-medium">{buff.name}</div>
					<div class="text-xs text-slate-600">{buff.description}</div>
				</Label>

				<Switch
					id={buff.name.toLowerCase().replace(' ', '-')}
					bind:checked={activeBuffs[buff.name]}
				/>
			</div>
		{/each}
	</div>
{/each}
