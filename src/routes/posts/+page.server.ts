import { getPosts } from '$lib/server/posts';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
    const { posts } = await getPosts()

    return {
        posts,
    }
};
