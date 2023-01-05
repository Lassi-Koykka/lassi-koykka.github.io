import { getPosts } from '$lib/posts';
import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async () => {
    const { posts } = await getPosts()
    // if(posts.length < 1) throw redirect(300, "/")

    return {
        posts,
    }
};
