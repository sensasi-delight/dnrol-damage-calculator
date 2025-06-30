import type { Job } from './jobs';
import type Skill from './skills/types/skill';
// dataset
import acrobatSkills from './skills/acrobat.csv';
import bowMasterSkills from './skills/bow master.csv';
import elementalLordSkills from './skills/elemental lord.csv';
import forceUserSkills from './skills/force user.csv';
import mercenarySkills from './skills/mercenary.csv';
import paladinSkills from './skills/paladin.csv';
import priestSkills from './skills/priest.csv';
import swordsmanSkills from './skills/swordsman.csv';

const jobSkills: { [key in Job]: Skill[] } = {
	acrobat: acrobatSkills,
	'bow master': bowMasterSkills,
	'elemental lord': elementalLordSkills,
	'force user': forceUserSkills,
	mercenary: mercenarySkills,
	priest: priestSkills,
	paladin: paladinSkills,
	swordsman: swordsmanSkills
};

export default jobSkills;
