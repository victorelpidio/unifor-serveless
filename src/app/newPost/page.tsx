'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPost(title, content);
    router.push("/");
  }
  
  async function createPost(title: string, content: string) {
    console.log("criando um post")
    // const response = await fetch("/api/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ title, content }),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to create post");
    // }
  }

  return (
    <main className="p-6 max-w-[80%] mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-cyan-200">Novo Post</h1>
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