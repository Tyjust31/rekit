import adapter from "svelte-adapter-bun";

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		//outDir: 'build', // Spécifiez le répertoire de sortie

		adapter: adapter()
	}
};

export default config;
