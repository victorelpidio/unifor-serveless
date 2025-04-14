"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [post, setPost] = useState<any>(null); // Use a more specific type if available
  const { theme } = useTheme();
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${resolvedParams.slug}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data); // Set the post data
      } catch (error) {
        console.error("Failed to fetch post:", error);
        notFound(); // Handle not found or error
      }
    };

    fetchPost();
  }, [resolvedParams.slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${post.slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
        },
        body: JSON.stringify({
          text: newComment,
          author: {
            username: "current_user", // Replace with actual user data
            role: "USER",
          },
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("Comment submitted successfully:", data);
        setNewComment(""); // Clear the comment input
        // Optionally, you can refresh the comments or update the UI after successful comment submission
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      // Handle error (e.g., show a message to the user)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) return notFound();

  // Define text colors based on theme
  const titleColor = theme === 'dark' ? '#aacdd4' : '#315b65'; // tertiary-300 : primary-600
  const contentColor = theme === 'dark' ? '#aacdd4' : '#315b65'; // tertiary-300 : primary-600

  return (
    <main className="p-6 max-w-[80%] mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: titleColor }}>{post.title}</h1>
        <p className="text-gray-500">Publicado por {post.author.username} em {post.toISOString().split('T')[0]}</p>
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
            className={`mt-2 px-4 py-2 bg-cyan-800 dark:hover:bg-cyan-700 text-white rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
          </button>
        </form>
        
        <div className="space-y-4">
          {post.comments.map((comment: Comment, index: number) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium" style={{ color: theme === 'dark' ? '#c2dbe0' : '#315b65' }}>
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