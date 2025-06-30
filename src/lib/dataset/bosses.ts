export const bossNames = [
	'level 1 monster',
	'minotaur',
	'cerberus',
	'manticore',
	'apocalypse'
] as const;

const bosses: {
	[name in (typeof bossNames)[number]]: {
		// name: string;
		// hp: number;
		defenses: {
			normal: number;
			crit: number;
		};
	};
} = {
	'level 1 monster': {
		defenses: {
			normal: 0.72,
			crit: 0.85
		}
	},
	minotaur: {
		defenses: {
			normal: 0.72,
			crit: 0.85
		}
	},
	cerberus: {
		defenses: {
			normal: 0.6,
			crit: 0.65
		}
	},
	manticore: {
		defenses: {
			normal: 0.5,
			crit: 0.5
		}
	},
	apocalypse: {
		defenses: {
			normal: 0.5,
			crit: 0.5
		}
	}
};

export default bosses;
