"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { use } from "react";
import ReactMarkdown from "react-markdown";

interface Comment {
  text: string;
  author: {
    username: string;
    role: string;
  };
  createdAt: Date;
  updatedAt: Date;
  score: number;
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default function PostPage({ params }: PostPageProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const resolvedParams = use(params);
  const post = getPostBySlug(resolvedParams.slug);

  function getPostBySlug(slug: string) {
    const post = {
      title: "Explorando Next.js com TypeScript",
      content: `# Explorando Next.js com TypeScript

Este post explora como criar aplicações robustas com Next.js e TypeScript.

## Por que Next.js?

Next.js é um framework React que oferece várias funcionalidades poderosas:

- **Renderização do lado do servidor (SSR)**
- **Geração de sites estáticos (SSG)**
- **Roteamento baseado em sistema de arquivos**
- **Suporte a API Routes**

## Integração com TypeScript

TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais seguro e mais fácil de manter:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Olá, \${user.name}!\`;
}
\`\`\`

## Conclusão

A combinação de Next.js e TypeScript oferece uma experiência de desenvolvimento moderna e produtiva.`,
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
        },
        {
          text: "Gostei muito das explicações sobre TypeScript!",
          author: {
            username: "ts_fan",
            role: "USER"
          },
          createdAt: new Date("2025-04-10T16:00:00Z"),
          updatedAt: new Date("2025-04-10T16:00:00Z"),
          score: 3
        }
      ],
      score: 42
    };

    return post
  }
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // For now, just log the comment
      console.log("New comment:", newComment);
      
      // TODO: Implement the actual POST request
      /*
      const response = await fetch(`/api/posts/${post.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment,
          // In a real app, you would get the author from the authenticated user
          author: {
            username: "current_user",
            role: "USER"
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      // Refresh the comments or update the UI
      // This would typically involve fetching the updated post data
      // or updating the local state with the new comment
      */
      
      // Clear the form after successful submission
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      // In a real app, you would show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return notFound();

  // Define text colors based on theme
  const titleColor = theme === 'dark' ? '#aacdd4' : '#aacdd4'; // tertiary-300 : primary-600
  const contentColor = theme === 'dark' ? '#aacdd4' : '#aacdd4'; // tertiary-300 : primary-600

  return (
    <main className="p-6 max-w-[80%] mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: titleColor }}>{post.title}</h1>
        <p className="text-gray-500">Publicado por {post.author.username} em {post.createdAt.toISOString().split('T')[0]}</p>
        <hr className="pb-5 text-cyan-50" />
        <div className="prose dark:prose-invert max-w-none" style={{ color: contentColor }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 my-8" />

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-cyan-700">Comentários</h2>

        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={3}
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 px-4 py-2 bg-cyan-800 dark hover:bg-cyan-700 text-white rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
          </button>
        </form>
        
        <div className="space-y-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium" style={{ color: theme === 'dark' ? '#c2dbe0' : '#b9d5d5' }}>
                  {comment.author.username}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {comment.createdAt.toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Score: {comment.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}