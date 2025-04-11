import { notFound } from "next/navigation";


interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostById(params.slug);

  function getPostById(slug: string) {
    const post = {
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
    };

    return post
  }
      
  if (!post) return notFound();
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
    </main>
  );
}