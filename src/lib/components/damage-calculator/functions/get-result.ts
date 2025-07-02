import skills from '$lib/dataset/skills';
import type ResultRow from '../types/result-row';
import type FormValues from '../types/form-values';
import pets from '$lib/dataset/pets';
import bosses from '$lib/dataset/bosses';

export default function getResult(formValues: FormValues): ResultRow[] {
	if (!formValues.job) {
		return [];
	}

	const avgDamage =
		formValues.minBaseAttack + formValues.maxBaseAttack > 0
			? (formValues.minBaseAttack + formValues.maxBaseAttack) / 2
			: 0;

	const petAdditionalDamageRateDecimal =
		1 +
		(formValues.pet && pets[formValues.pet]
			? pets[formValues.pet].tiers[0].inDungeonBonus.attack
			: 0);

	const boss = bosses[formValues.boss];

	const battleHowlBuff = 1 + (formValues.buffs['Battle Howl'] ? 0.05 : 0);
	const strikingBuff = 1 + (formValues.buffs['Striking'] ? 0.05 : 0);
	const jobPrivilegeBuffRateDecimal =
		1 +
		(['acrobat', 'priest'].includes(formValues.job)
			? 0.1
			: formValues.job === 'bow master'
				? 0.05
				: 0);

	const lightBuff =
		(formValues.buffs['Blessing of Light'] ? 0.05 : 0) +
		(formValues.buffs['Conviction Aura'] ? 0.05 : 0);

	return skills
		.filter((skill) => skill.job === formValues.job)
		.map((skill): ResultRow => {
			const skillLevel =
				formValues.skillLevels.find((sl) => sl.skillId === skill.id)?.level ??
				skill.defaultLevel ??
				0;

			const skillDamageRateDecimal =
				skillLevel > 0
					? skill.baseDamageRateDecimal + skill.rateDecimalStepPerLevel * (skillLevel - 1)
					: skill.baseDamageRateDecimal;

			const normalDamage =
				avgDamage *
				petAdditionalDamageRateDecimal *
				skillDamageRateDecimal *
				battleHowlBuff *
				strikingBuff *
				jobPrivilegeBuffRateDecimal *
				boss.defenses.normal;

			const finalDamage = (normalDamage * formValues.finalDamageRate) / 100;
			const elementalDamage =
				(normalDamage * formValues.elementalDamageRate) / 100 + normalDamage * lightBuff;
			const totalDamage = normalDamage + finalDamage + elementalDamage;

			const criticalTotalDamage =
				totalDamage +
				(totalDamage * formValues.critDamageRate) / 100 +
				totalDamage * (boss.defenses.crit - boss.defenses.normal);

			return {
				skill,
				skillLevel,
				skillDamageRateDecimal,
				normalDamage,
				finalDamage,
				elementalDamage,
				totalDamage,
				criticalTotalDamage
			};
		});
}
