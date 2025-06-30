<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	//
	import jobSkills from '$lib/dataset/job-skills';
	import type { Job } from '$lib/dataset/jobs';
	import { Input } from '../ui/input';

	let {
		selectedClass
	}: {
		selectedClass: Job;
	} = $props();
</script>

<Table.Root>
	<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
	<Table.Header>
		<Table.Row>
			<Table.Head>Skills</Table.Head>
			<Table.Head>Level</Table.Head>
			<Table.Head>Normal Damage</Table.Head>
			<Table.Head>Critical Damage</Table.Head>
			<Table.Head>Final Damage</Table.Head>
			<Table.Head>Element Damage</Table.Head>
			<Table.Head>Total</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each jobSkills[selectedClass].sort((a, b) => a.name.localeCompare(b.name)) as skill}
			<Table.Row
				class={skill.type === 'Passive'
					? 'bg-yellow-50 hover:bg-yellow-100'
					: skill.type === 'Active'
						? 'bg-blue-50 hover:bg-blue-100'
						: 'bg-pink-50 hover:bg-pink-100'}
			>
				<Table.Cell>
					{skill.name}
					<div class="text-xs text-slate-600">&times; {skill.baseDamageRateDecimal * 100}%</div>
				</Table.Cell>
				<Table.Cell>
					<Input
						class="w-16"
						id={skill.name + '-level'}
						type="number"
						max={skill.maxLevel ?? 10}
						min={skill.minLevel ?? 0}
						value={skill.minLevel ?? 1}
					/>
				</Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell class="text-right"></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
