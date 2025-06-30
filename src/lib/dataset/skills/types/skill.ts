export default interface Skill {
	name: string;
	type: 'active' | 'passive' | 'ultimate';
	damagePercents: number[];
}
