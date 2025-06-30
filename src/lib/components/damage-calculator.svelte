<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Calculator, Shield } from '@lucide/svelte';
	import { type Job, jobNames } from '$lib/dataset/jobs';
	import { titleCase } from 'title-case';
	import Result from './damage-calculator/result.svelte';
	import { bossNames } from '$lib/dataset/bosses';
	import { petNames } from '$lib/dataset/pets';
	import buffsSet, { availableBuffJobs } from '$lib/dataset/buffs';
	import BuffsSwitch from './damage-calculator/buffs-switch.svelte';
	import PetSelect from './damage-calculator/pet-select.svelte';

	let stats: {
		class: Job | '';
		element: 'neutral' | 'light' | 'dark' | 'fire' | 'water';
		minBaseAttack: string;
		maxBaseAttack: string;
		critDamage: string;
		finalDamage: string;
		elemental: string;
	} = $state({
		class: '',
		element: 'neutral',
		minBaseAttack: '0',
		maxBaseAttack: '0',
		critDamage: '0',
		finalDamage: '0',
		elemental: '0'
	});

	let selectedPet = $state('');
	let selectedBoss = $state('');

	let activeBuffs: {
		[buffName: string]: boolean;
	} = $state(
		availableBuffJobs.reduce(
			(acc, job) => {
				buffsSet[job].flatMap((buff) => {
					acc[buff.name] = false;
				});

				return acc;
			},
			{} as {
				[buffName: string]: boolean;
			}
		)
	);

	let results = $state({
		totalDamage: 0,
		finalDamage: 0,
		elementDamage: 0,
		normalDamage: 0,
		criticalDamage: 0
	});

	const resetForm = () => {
		stats = {
			class: '',
			element: 'neutral',
			minBaseAttack: '0',
			maxBaseAttack: '0',
			critDamage: '0',
			finalDamage: '0',
			elemental: '0'
		};
		selectedPet = '';
		selectedBoss = '';
		activeBuffs = {};
		results = {
			totalDamage: 0,
			finalDamage: 0,
			elementDamage: 0,
			normalDamage: 0,
			criticalDamage: 0
		};
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-12 pb-32">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mb-8 text-center">
			<div class="mb-4 flex items-center justify-center gap-3">
				<Calculator class="h-8 w-8 text-blue-600" />
				<h1 class="text-3xl font-bold text-slate-800">DNROL Damage Calculator</h1>
			</div>
			<p class="mx-auto max-w-2xl text-slate-600">
				Calculate your character's damage output with precision. Configure your stats, select buffs,
				and see detailed damage breakdowns.
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<!-- Basic Info -->
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Shield class="h-5 w-5" />
						Character Information
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-3 gap-4">
						<div class="space-y-2">
							<Label for="class">Class *</Label>
							<Select type="single" bind:value={stats.class}>
								<SelectTrigger class="w-full"
									>{stats.class ? titleCase(stats.class) : 'Select class'}</SelectTrigger
								>
								<SelectContent>
									{#each jobNames as jobName}
										<SelectItem value={jobName}>{titleCase(jobName)}</SelectItem>
									{/each}
								</SelectContent>
							</Select>
						</div>

						<div class="space-y-2">
							<Label for="element">Element *</Label>
							<Select type="single" bind:value={stats.element}>
								<SelectTrigger class="w-full">{titleCase(stats.element)}</SelectTrigger>
								<SelectContent>
									<SelectItem value="neutral">Neutral</SelectItem>
									<SelectItem value="light">Light</SelectItem>
									<SelectItem value="dark">Dark</SelectItem>
									<SelectItem value="fire">Fire</SelectItem>
									<SelectItem value="water">Water</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div class="space-y-2">
							<PetSelect value={selectedPet} />
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="min-attack">Min Base Attack *</Label>
							<Input
								id="min-attack"
								type="number"
								placeholder="0"
								bind:value={stats.minBaseAttack}
							/>
						</div>
						<div class="space-y-2">
							<Label for="max-attack">Max Base Attack *</Label>
							<Input
								id="max-attack"
								type="number"
								placeholder="0"
								bind:value={stats.maxBaseAttack}
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="crit-damage">Critical Damage (%)</Label>
						<Input id="crit-damage" type="number" placeholder="0" bind:value={stats.critDamage} />
					</div>

					<div class="space-y-2">
						<Label for="final-damage">Final Damage (%)</Label>
						<Input
							id="final-damage"
							type="number"
							step="0.01"
							placeholder="0.00"
							bind:value={stats.finalDamage}
						/>
					</div>

					<div class="space-y-2">
						<Label for="elemental">Elemental Damage (%)</Label>
						<Input
							id="elemental"
							type="number"
							step="0.01"
							placeholder="0.00"
							bind:value={stats.elemental}
						/>
					</div>
				</CardContent>
			</Card>

			<!-- Buffs -->
			<Card>
				<CardHeader>
					<CardTitle>Active Buffs</CardTitle>
				</CardHeader>
				<CardContent class="space-y-6">
					<BuffsSwitch {activeBuffs} />
				</CardContent>
			</Card>
		</div>

		<Card class="mt-8">
			<CardHeader>
				<CardTitle>Damage Calculation</CardTitle>
			</CardHeader>
			<CardContent class="space-y-6">
				<div class="space-y-2">
					<Label for="boss">Target Boss *</Label>
					<Select type="single" bind:value={selectedBoss}>
						<SelectTrigger
							>{selectedBoss ? titleCase(selectedBoss) : 'Select target boss'}</SelectTrigger
						>
						<SelectContent>
							{#each bossNames as bossName}
								<SelectItem value={bossName}>{titleCase(bossName)}</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				</div>

				{#if stats.class}
					<Result selectedClass={stats.class} />
				{:else}
					<div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
						<p class="text-sm text-amber-800">
							Please fill in all required fields (*) to calculate damage.
						</p>
					</div>
				{/if}
			</CardContent>
		</Card>
	</div>
</div>
