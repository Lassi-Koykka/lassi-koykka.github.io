import { sveltekit } from '@sveltejs/kit/vite';

const config: import('vite').UserConfig = {
    server: {
        fs: {
            allow: ['./posts']
        }
    },
	plugins: [sveltekit()]
};

export default config;
