import type { Job } from './jobs';

export const availableBuffJobs = ['priest', 'paladin', 'mercenary'] satisfies Job[];

const buffs: {
	[key in (typeof availableBuffJobs)[number]]: {
		name: string;
		description: string;
		bonusStats: {
			physicalDamage?: number;
			magicDamage?: number;

			physicalAttack?: number;
			magicAttack?: number;

			lightAttack?: number;
		};
	}[];
} = {
	priest: [
		{
			name: 'Striking',
			description: '+5% Physical & Magic Damage',
			bonusStats: {
				physicalDamage: 0.05,
				magicDamage: 0.05
			}
		},
		{
			name: 'Blessing of Light',
			description: '+10% Light Attack',
			bonusStats: {
				lightAttack: 0.1
			}
		}
	],

	paladin: [
		{
			name: 'Conviction Aura',
			description: '+5% Light Attack',
			bonusStats: {
				lightAttack: 0.05
			}
		}
	],

	mercenary: [
		{
			name: 'Battle Howl',
			description: '+5% Physical & Magic Attack',
			bonusStats: {
				physicalAttack: 0.06
			}
		}
	]
};

export default buffs;
