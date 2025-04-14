'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "xok";
   console.log("Using API URL:", apiUrl);

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Title:", title);
    console.log("Content:", content);
    
    createPost(title, content);
    router.push("/");
  }
  
  async function createPost(title: string, content: string) {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`; // Update the URL for the API

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        // Optionally, you can redirect or update the UI after successful post creation
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle error (e.g., show a message to the user)
    }
  }

  return (
    <main className="p-6 max-w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-cyan-700">Novo Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-2xl bg-cyan-50">
        <input
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="content" className="block mb-2 font-medium">
              Markdown Input
            </label>
            <textarea
              id="content"
              placeholder="Escreva seu conteúdo em Markdown..."
              className="w-full border p-2 rounded h-60"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Preview
            </label>
            <div className="border p-2 rounded h-60 overflow-y-auto">
              {content ? (
                <ReactMarkdown>
                  {content}
                </ReactMarkdown>
              ) : (
                <p className="text-gray-400">Veja como o código está ficando</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition-colors"
        >
          Publicar
        </button>
      </form>
    </main>
  );
}