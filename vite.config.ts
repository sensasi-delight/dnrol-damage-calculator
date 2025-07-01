import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		dsv({
			processRow: (row) => {
				Object.keys(row).forEach((key) => {
					const value = row[key];

					// @ts-expect-error ts(2322)
					row[key] = value === '' ? null : isNaN(+value) ? value : +value;
				});
			}
		})
	]
});
