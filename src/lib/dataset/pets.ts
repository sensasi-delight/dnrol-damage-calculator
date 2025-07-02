export const petNames = [
	'shadowstripe',
	'orangeheaded hound',
	'elephant dort',
	'flipped bunny',
	'magic kitty',
	'rogue crazy duck',
	'hound'
] as const;

export type Pet = {
	tiers: {
		inDungeonBonus: {
			/**
			 * Attack bonus in percent as float
			 */
			attack: number;
		};
	}[];
};

const pets: { [name in (typeof petNames)[number]]: Pet } = {
	shadowstripe: { tiers: [{ inDungeonBonus: { attack: 0.03 } }] },
	'orangeheaded hound': { tiers: [{ inDungeonBonus: { attack: 0.02 } }] },
	'elephant dort': { tiers: [{ inDungeonBonus: { attack: 0.02 } }] },
	'flipped bunny': { tiers: [{ inDungeonBonus: { attack: 0.02 } }] },
	'magic kitty': { tiers: [{ inDungeonBonus: { attack: 0.01 } }] },
	'rogue crazy duck': { tiers: [{ inDungeonBonus: { attack: 0 } }] },
	hound: { tiers: [{ inDungeonBonus: { attack: 0 } }] }
};

export default pets;
