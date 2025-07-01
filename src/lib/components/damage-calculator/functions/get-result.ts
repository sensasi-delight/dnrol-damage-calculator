import skills from '$lib/dataset/skills';
import type ResultRow from '../types/result-row';
import type FormValues from '../types/form-values';

export default function getResult(formValues: FormValues): ResultRow[] {
	if (!formValues.job) {
		return [];
	}

	const avgDamage =
		formValues.minBaseAttack + formValues.maxBaseAttack > 0
			? (formValues.minBaseAttack + formValues.maxBaseAttack) / 2
			: 0;

	return skills
		.filter((skill) => skill.job === formValues.job)
		.map((skill) => {
			const skillLevel =
				formValues.skillLevels.find((sl) => sl.skillId === skill.id)?.level ??
				skill.defaultLevel ??
				0;

			const skillDamageRateDecimal =
				skillLevel > 0
					? skill.baseDamageRateDecimal + skill.rateDecimalStepPerLevel * skillLevel
					: 0;

			const normalDamage = avgDamage * skillDamageRateDecimal;
			const finalDamage = normalDamage * formValues.finalDamageRateDecimal;
			const elementalDamage = normalDamage * formValues.elementalDamageRateDecimal;

			return {
				skill,
				skillLevel,
				normalDamage,
				finalDamage,
				elementalDamage,
				totalDamage: normalDamage + finalDamage + elementalDamage
			};
		});
}
