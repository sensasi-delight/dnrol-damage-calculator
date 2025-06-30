export default interface Skill {
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
	minLevel?: number;

	/**
	 * Maximum level
	 *
	 * @default 1
	 */
	maxLevel?: number;
}
