import Link from "next/link";
import type { PostDetailsResponseDTO } from "../types";


export default function HomePage() {
  const posts: Array<PostDetailsResponseDTO> = [
    {
      title: "Explorando Next.js com TypeScript",
      content: "Este post explora como criar aplicações robustas com Next.js e TypeScript.",
      createdAt: new Date("2025-04-10T12:00:00Z"),
      slug: "explorando-nextjs-com-typescript",
      author: {
        username: "dev_guru",
        role: "ADMIN"
      },
      comments: [
        {
          text: "Post muito útil! Obrigado por compartilhar.",
          author: {
            username: "frontend_lover",
            role: "USER"
          },
          createdAt: new Date("2025-04-10T14:00:00Z"),
          updatedAt: new Date("2025-04-10T14:30:00Z"),
          score: 5
        }
      ],
      score: 42
    },
    {
      title: "Como usar o TailwindCSS com componentes React",
      content: "Neste guia, você aprenderá a estilizar seus componentes React usando TailwindCSS.",
      createdAt: new Date("2025-04-09T09:30:00Z"),
      slug: "tailwindcss-com-react",
      author: {
        username: "css_master",
        role: "MODERATOR"
      },
      comments: [
        {
          text: "Tailwind é maravilhoso, nunca mais escrevi CSS puro!",
          author: {
            username: "ui_builder",
            role: "USER"
          },
          createdAt: new Date("2025-04-09T11:00:00Z"),
          updatedAt: new Date("2025-04-09T11:15:00Z"),
          score: 8
        },
        {
          text: "Prefiro CSS Modules, mas o post está ótimo.",
          author: {
            username: "opinionated_dev",
            role: "USER"
          },
          createdAt: new Date("2025-04-09T11:45:00Z"),
          updatedAt: new Date("2025-04-09T12:00:00Z"),
          score: 2
        }
      ],
      score: 36
    },
    {
      title: "Otimizando performance com React.memo e useCallback",
      content: "Evite re-renderizações desnecessárias e aumente a performance do seu app React.",
      createdAt: new Date("2025-04-08T18:20:00Z"),
      slug: "otimizando-performance-react",
      author: {
        username: "perf_dev",
        role: "ADMIN"
      },
      comments: [],
      score: 27
    }
  ];

  return (
    <main className="p-6">
      <div className="flex flex-col justify-between items-center mb-4">
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