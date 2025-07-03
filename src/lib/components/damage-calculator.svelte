<script lang="ts">
	// vendors
	import { Calculator, Shield } from '@lucide/svelte';
	import { titleCase } from 'title-case';
	import { onMount } from 'svelte';
	// uis
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	// dataset
	import { jobNames } from '$lib/dataset/jobs';
	import { bossNames } from '$lib/dataset/bosses';
	import buffsSet, { availableBuffJobs } from '$lib/dataset/buffs';
	// utils
	import { getLocalStorageData, setLocalStorageData } from '$lib/utils';
	// components
	import type FormValues from './damage-calculator/types/form-values';
	import type Skill from '$lib/dataset/types/skill';
	import Result from './damage-calculator/result-table.svelte';
	import BuffsSwitch from './damage-calculator/buffs-switch.svelte';
	import PetSelect from './damage-calculator/pet-select.svelte';
	import getResult from './damage-calculator/functions/get-result';
	import Button from './ui/button/button.svelte';
	import skills from '$lib/dataset/skills';
	import CriticalDamageLabel from './damage-calculator/critical-damage-label.svelte';
	import ElementLabel from './damage-calculator/element-label.svelte';
	import FinalDamageLabel from './damage-calculator/final-damage-label.svelte';
	import ElementalLabel from './damage-calculator/elemental-label.svelte';
	import BuffInfoDialog from './damage-calculator/buff-info-dialog.svelte';
	import MinAttackLabel from './damage-calculator/min-attack-label.svelte';

	const DEFAULT_FORM_VALUES: FormValues = {
		job: undefined,
		element: undefined,
		minBaseAttack: 0,
		maxBaseAttack: 0,
		pet: undefined,
		boss: 'apocalypse',

		critDamageRate: 0,
		finalDamageRate: 0,
		elementalDamageRate: 0,

		buffs: availableBuffJobs.reduce(
			(acc, job) => {
				buffsSet[job].flatMap((buff) => {
					acc[buff.name] = false;
				});

				return acc;
			},
			{} as {
				[buffName: string]: boolean;
			}
		),

		skillLevels: []
	};

	let formValues = $state(DEFAULT_FORM_VALUES);

	const LOCAL_STORAGE_KEY = 'formValues';

	onMount(() => {
		const storedValue = getLocalStorageData<FormValues>(LOCAL_STORAGE_KEY);

		if (storedValue) {
			formValues = storedValue;
		}
	});

	// const resetForm = () => {
	// 	formValues = DEFAULT_FORM_VALUES;
	// };

	function handleStoreFormValues() {
		const jobSkillIds = skills
			.filter((skill) => skill.job === formValues.job)
			.map((skill) => skill.id);

		const copy = {
			...formValues
		};

		setLocalStorageData(LOCAL_STORAGE_KEY, {
			...copy,

			skillLevels: copy.skillLevels.filter((sl) => jobSkillIds.includes(sl.skillId))
		});
	}

	let timer: number;

	let result = $derived.by(() => {
		clearTimeout(timer);
		timer = setTimeout(() => handleStoreFormValues(), 750);

		if (!formValues.job) {
			return;
		}

		return getResult(formValues);
	});

	function handleSkillLevelChange(skillId: Skill['id'], level: number) {
		const isLevelSet = formValues.skillLevels.some((sl) => sl.skillId === skillId);

		if (isLevelSet) {
			formValues.skillLevels = formValues.skillLevels.map((sl) => {
				if (sl.skillId === skillId) {
					return { skillId: skillId, level };
				}

				return sl;
			});
		} else {
			formValues.skillLevels = [...formValues.skillLevels, { skillId, level }];
		}
	}
</script>

<div class="mx-auto max-w-6xl">
	<!-- Header -->
	<div class="mb-14 text-center">
		<div class="mb-4 flex items-center justify-center gap-3">
			<Calculator class="h-8 w-8 text-blue-600" />
			<h1 class="text-xl font-bold text-slate-800 sm:text-3xl">DNROL Damage Calculator</h1>
		</div>
		<!-- <p class="mx-auto max-w-2xl text-slate-600">
			Calculate your character's damage output with precision. Configure your stats, select buffs,
			and see detailed damage breakdowns.
		</p> -->
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
				<div class="space-y-2">
					<Label for="class">Class *</Label>
					<Select type="single" bind:value={formValues.job}>
						<SelectTrigger class="w-full"
							>{formValues.job ? titleCase(formValues.job) : 'Select class'}</SelectTrigger
						>
						<SelectContent>
							{#each jobNames.toSorted() as jobName}
								<SelectItem value={jobName}>{titleCase(jobName)}</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<ElementLabel />

						<Select name="element" type="single" bind:value={formValues.element}>
							<SelectTrigger class="w-full"
								>{formValues.element ? titleCase(formValues.element) : ''}</SelectTrigger
							>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="fire">Fire</SelectItem>
								<SelectItem value="water">Water</SelectItem>

								<Button
									class="w-full px-2"
									variant="secondary"
									size="sm"
									onclick={(e) => {
										e.stopPropagation();

										formValues.element = undefined;
									}}
								>
									Clear
								</Button>
							</SelectContent>
						</Select>
					</div>

					<div class="space-y-2">
						<PetSelect bind:value={formValues.pet} />
					</div>

					<div class="space-y-2">
						<MinAttackLabel />

						<Input
							id="min-attack"
							type="number"
							placeholder="0"
							min={0}
							max={formValues.maxBaseAttack}
							bind:value={formValues.minBaseAttack}
							onchange={({ currentTarget: { value } }) => {
								if (!formValues.maxBaseAttack) {
									formValues.maxBaseAttack = Number(value);
								}
							}}
						/>
					</div>
					<div class="space-y-2">
						<Label for="max-attack">Max Base Attack *</Label>
						<Input
							id="max-attack"
							type="number"
							placeholder="0"
							min="0"
							bind:value={formValues.maxBaseAttack}
							onchange={({ currentTarget: { value } }) => {
								if (!formValues.minBaseAttack) {
									formValues.minBaseAttack = Number(value);
								}
							}}
						/>
					</div>
				</div>

				<div class="space-y-2">
					<CriticalDamageLabel />

					<Input
						id="crit-damage"
						type="number"
						step="0.01"
						placeholder="0"
						min="0"
						bind:value={formValues.critDamageRate}
					/>
				</div>

				<div class="space-y-2">
					<FinalDamageLabel />

					<Input
						id="final-damage"
						type="number"
						step="0.01"
						placeholder="0"
						bind:value={formValues.finalDamageRate}
					/>
				</div>

				<div class="space-y-2">
					<ElementalLabel />
					<Input
						id="elemental"
						type="number"
						step="0.01"
						placeholder="0"
						bind:value={formValues.elementalDamageRate}
					/>
				</div>
			</CardContent>
		</Card>

		<!-- Buffs -->
		<Card>
			<CardHeader>
				<BuffInfoDialog />
			</CardHeader>
			<CardContent class="space-y-6">
				<BuffsSwitch activeBuffs={formValues.buffs} />
			</CardContent>
		</Card>
	</div>

	<Card class="mt-8">
		<CardHeader>
			<CardTitle>Damage Calculation</CardTitle>
			<p class="text-xs text-slate-600">
				This will not show your exact damage but it will show an estimate or close to your actual
				damage or what your damage might be, since the game utilizes random number generation
				mechanics for your damage.
			</p>
		</CardHeader>
		<CardContent class="space-y-6">
			<div class="space-y-2">
				<Label for="boss">Target Boss *</Label>
				<Select type="single" bind:value={formValues.boss}>
					<SelectTrigger
						>{formValues.boss ? titleCase(formValues.boss) : 'Select target boss'}</SelectTrigger
					>
					<SelectContent>
						{#each bossNames as bossName}
							<SelectItem value={bossName}>{titleCase(bossName)}</SelectItem>
						{/each}
					</SelectContent>
				</Select>
			</div>

			{#if result}
				<Result data={result} onSkillLevelChange={handleSkillLevelChange} />
			{:else}
				<div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
					<p class="text-sm text-amber-800">
						Please fill in all required fields (*) to calculate damage.
					</p>
				</div>
			{/if}
		</CardContent>
	</Card>

	<h2 class="mt-12 mb-4 text-xl font-bold text-slate-800">Overview</h2>

	<p class="text-slate-600">
		This calculator will serve in calculating for your total damage, when using skills this will
		also serve as a way for you to compute whether adding Elemental stat will benefit from your
		build or will it will lessen your total damage, if you ever plan to invest in Elemental stats.
		Final damage and critical damage will also be included to this calculator, this will help you
		determine how much damage will be added to your total damage, if you ever plan to invest in
		final damage and critical damage.
	</p>
</div>
