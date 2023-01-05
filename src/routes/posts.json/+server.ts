import { getPosts } from '$lib/server/posts'

export async function GET() {
  const { posts } = await getPosts()
  posts.sort((b, a) => {
    const da = a.date ? new Date(a.date).getTime() : new Date()
    const db = b.date ? new Date(b.date).getTime() : new Date()
    if (da < db) return -1
    else if (da > db) return 1
    return 0
  })

  return new Response(JSON.stringify(posts, null, 2))
}
