import type { Job } from '$lib/dataset/jobs';

export default interface Skill {
	id: number;

	job: Job;

	name: string;

	type: 'Active' | 'Passive' | 'Ultimate';

	/**
	 * Percentage of level 1 damage
	 */
	baseDamageRateDecimal: number;

	/**
	 * Percentage step per level
	 */
	rateDecimalStepPerLevel: number;

	/**
	 * Minimum level
	 *
	 * @default 0
	 */
	defaultLevel: number | null;

	/**
	 * Maximum level
	 *
	 * @default 10
	 */
	maxLevel: number | null;
}
