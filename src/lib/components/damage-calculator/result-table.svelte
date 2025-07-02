<script lang="ts">
	// ui
	import * as Table from '$lib/components/ui/table';
	import { Info } from '@lucide/svelte';
	//
	import { Input } from '../ui/input';
	import * as Tooltip from '../ui/tooltip';
	import type ResultRow from './types/result-row';

	let {
		data: rows,
		onSkillLevelChange
	}: {
		data: ResultRow[];
		onSkillLevelChange: (skillId: number, level: number) => void;
	} = $props();

	function formatNumber(num: number) {
		return num.toLocaleString('en-US', {
			style: 'decimal',
			compactDisplay: 'short',
			maximumFractionDigits: 0
		});
	}
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>#</Table.Head>
			<Table.Head>Skills</Table.Head>
			<Table.Head>Level</Table.Head>
			<Table.Head>Normal Damage</Table.Head>
			<Table.Head>Final Damage</Table.Head>
			<Table.Head>Element Damage</Table.Head>
			<Table.Head>Total</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each rows as row, index}
			<Table.Row
				class={(row.skill.type === 'Passive'
					? 'bg-yellow-50 hover:bg-yellow-100'
					: row.skill.type === 'Active'
						? 'bg-blue-50 hover:bg-blue-100'
						: 'bg-pink-50 hover:bg-pink-100') + (!row.skillLevel ? ' opacity-30' : '')}
			>
				<Table.Cell>{index + 1}</Table.Cell>
				<Table.Cell class="font-medium">
					{row.skill.name}
					<div class="text-xs text-slate-600">
						&times; {formatNumber(row.skillDamageRateDecimal * 100)}%
					</div>
				</Table.Cell>
				<Table.Cell>
					<Input
						class="w-16"
						id={row.skill.id + '-level-input'}
						type="number"
						max={row.skill.maxLevel ?? 10}
						min={0}
						value={row.skillLevel}
						onchange={({ currentTarget: { value } }) => {
							onSkillLevelChange(row.skill.id, Number(value));
						}}
					/>
				</Table.Cell>
				<Table.Cell class="text-right">{formatNumber(row.normalDamage)}</Table.Cell>
				<Table.Cell class="text-right">{formatNumber(row.finalDamage)}</Table.Cell>
				<Table.Cell class="text-right">{formatNumber(row.elementalDamage)}</Table.Cell>
				<Table.Cell class="text-right text-lg font-medium"
					>{formatNumber(row.totalDamage)}

					<div class="flex justify-end">
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger class="flex items-center gap-0.5 text-xs font-bold text-amber-500">
									<Info class="h-3 w-3" />
									{formatNumber(row.criticalTotalDamage)}
								</Tooltip.Trigger>
								<Tooltip.Content side="left" class=" text-amber-400">
									Critical Damage
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
