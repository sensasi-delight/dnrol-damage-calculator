import type { bossNames } from '$lib/dataset/bosses';
import type { Job } from '$lib/dataset/jobs';
import type { petNames } from '$lib/dataset/pets';
import type Skill from '$lib/dataset/types/skill';

export default interface FormValues {
	job: Job | undefined;
	element: 'light' | 'dark' | 'fire' | 'water' | undefined;
	minBaseAttack: number;
	maxBaseAttack: number;

	critDamageRate: number;
	finalDamageRate: number;
	elementalDamageRate: number;

	skillLevels: {
		skillId: Skill['id'];
		level: number;
	}[];

	buffs: { [key: string]: boolean };

	pet?: (typeof petNames)[number];

	boss: (typeof bossNames)[number];
}
