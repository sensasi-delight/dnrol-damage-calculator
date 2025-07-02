import type Skill from '$lib/dataset/types/skill';

export default interface ResultRow {
	skill: Skill;
	skillLevel: number;

	skillDamageRateDecimal: number;

	normalDamage: number;
	finalDamage: number;
	elementalDamage: number;
	totalDamage: number;
	criticalTotalDamage: number;
}
