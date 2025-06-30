import type Skill from './types/skill';

const priestSkills: Skill[] = [
	{
		name: 'Lightning Strike',
		type: 'active',
		damagePercents: [6.86, 7.08, 7.3, 7.52, 7.74, 7.96, 8.18, 8.4, 8.62, 8.84]
	},
	{
		name: 'Mind Breaker',
		type: 'passive',
		damagePercents: [6.92, 7.35, 7.78, 8.21, 8.63]
	},
	{
		name: 'Chain Lightning',
		type: 'active',
		damagePercents: [6.77, 7.06, 7.35, 7.64, 7.93, 8.22, 8.51, 8.8]
	}
];

export default priestSkills;
