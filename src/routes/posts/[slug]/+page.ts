import { redirect, type Load } from '@sveltejs/kit';
import type { PostMetadata } from 'src/types';

export const load: Load = async ({ params }) => {
    if(params.slug?.startsWith("_")) {
        throw redirect(300, "/posts")
    }
	const post = await import(`../../../../posts/${params.slug}/index.md`).catch(_err => {
        throw redirect(300, "/posts")
    });
    if(!post) throw redirect(300, "/posts")
	const { title, date }: PostMetadata = post.metadata;
	const Content = post.default;

	return {
		Content,
		title,
		date
	};
};
