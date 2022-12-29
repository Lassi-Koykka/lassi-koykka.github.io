import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    extensions: ['.svelte', '.md'],
    preprocess: [
        vitePreprocess(),
        preprocess({
            postcss: true
        }),
        mdsvex({
            extensions: ['.md']
        })
    ],
    kit: {
        adapter: adapter(),
        alias: {
            "$content": "./src/content.ts"
        }
    }
};

export default config;
