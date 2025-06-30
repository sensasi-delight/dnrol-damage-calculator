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
	shadowstripe: { tiers: [{ inDungeonBonus: { attack: 0.3 } }] },
	'orangeheaded hound': { tiers: [{ inDungeonBonus: { attack: 0.2 } }] },
	'elephant dort': { tiers: [{ inDungeonBonus: { attack: 0.2 } }] },
	'flipped bunny': { tiers: [{ inDungeonBonus: { attack: 0.2 } }] },
	'magic kitty': { tiers: [{ inDungeonBonus: { attack: 0.1 } }] },
	'rogue crazy duck': { tiers: [{ inDungeonBonus: { attack: 0 } }] },
	hound: { tiers: [{ inDungeonBonus: { attack: 0 } }] }
};

export default pets;
