import { basename, dirname } from 'path'
import type { IMetadata } from 'src/types'

export const getPosts = async () => {
  // taken from josh-collinsworth's blog starter! Thanks Josh!
  // https://github.com/josh-collinsworth/sveltekit-blog-starter/blob/main/src/routes/api/posts/index.json.js
  const posts: (IMetadata & {slug: string})[] = await Promise.all(
    Object.entries(import.meta.glob('../../posts/**/*.md')).map(
      async ([path, resolver]) => {
        const { metadata }: any = await resolver()
        const slug = basename(dirname(path))
        return { ...metadata, slug }
      }
    )
  )

  let sortedPosts = posts.sort(
    (a, b) => a.date && b.date  ? +new Date(b.date) - +new Date(a.date) : 0
  )

  sortedPosts = sortedPosts.map(post => ({
    ...post,
  }))

  return {
    posts: sortedPosts,
  }
}
