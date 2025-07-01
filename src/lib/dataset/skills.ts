import type Skill from './types/skill';
// @ts-expect-error ts(7016) undeclared file type
import skillsCsv from './skills.csv';

/**
 * All skills from all jobs
 *
 * @todo add csv data validation
 */
const skills = (skillsCsv as Skill[]).sort((a, b) => a.name.localeCompare(b.name));

export default skills;
