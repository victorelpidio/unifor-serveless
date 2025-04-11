import Link from "next/link";
import type { PostDetailsResponseDTO } from "../types";


export default function HomePage() {
  const posts: Array<PostDetailsResponseDTO> = [];

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/new" className="text-blue-600 hover:underline">Novo Post</Link>
      </div>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="border p-4 rounded-xl shadow">
            <Link href={`/post/${post.slug}`} className="text-xl font-semibold text-blue-700 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
}