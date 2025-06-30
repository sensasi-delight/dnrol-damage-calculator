import type { Job } from './jobs';
import priestSkills from './skills/priest';
import type Skill from './skills/types/skill';

const jobSkills: { [key in Job]: Skill[] } = {
	priest: priestSkills,
	paladin: priestSkills,
	acrobat: priestSkills,
	'bow master': priestSkills,
	swordsman: priestSkills,
	mercenary: priestSkills,
	'force user': priestSkills,
	'elemental lord': priestSkills
};

export default jobSkills;
