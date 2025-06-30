/**
 * List of available jobs/classes
 *
 * variable named to 'job(s)' instead 'class(es)' to prevent using preserved keywords
 */
export const jobNames = [
	'priest',
	'paladin',
	'acrobat',
	'bow master',
	'swordsman',
	'mercenary',
	'force user',
	'elemental lord'
] as const;

export type Job = (typeof jobNames)[number];
