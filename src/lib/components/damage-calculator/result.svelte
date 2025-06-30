<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	//
	import jobSkills from '$lib/dataset/job-skills';
	import type { Job } from '$lib/dataset/jobs';

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
			<Table.Head>Total Damage</Table.Head>
			<Table.Head>Final Damage</Table.Head>
			<Table.Head>Element Damage</Table.Head>
			<Table.Head>Normal Damage</Table.Head>
			<Table.Head>Critical Damage</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each jobSkills[selectedClass] as skill}
			<Table.Row>
				<Table.Cell>{skill.name}</Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell></Table.Cell>
				<Table.Cell class="text-right"></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
