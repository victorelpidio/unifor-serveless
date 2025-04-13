"use client";
import Link from "next/link";
import type { PostDetailsResponseDTO } from "../types";
import { useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import PostCard from "./components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<Array<PostDetailsResponseDTO>>([
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
    },
    {
      title: "Implementando autenticação com NextAuth.js",
      content: "Neste guia completo, vamos explorar como implementar autenticação em aplicações Next.js usando NextAuth.js. Você aprenderá sobre diferentes provedores de autenticação, como configurar sessões, proteger rotas e gerenciar tokens de acesso. Também abordaremos boas práticas de segurança e como integrar com bancos de dados para armazenar informações de usuário.",
      createdAt: new Date("2025-04-07T15:45:00Z"),
      slug: "autenticacao-com-nextauth",
      author: {
        username: "auth_expert",
        role: "ADMIN"
      },
      comments: [
        {
          text: "Excelente tutorial! Consegui implementar em menos de uma hora.",
          author: {
            username: "newbie_dev",
            role: "USER"
          },
          createdAt: new Date("2025-04-07T17:30:00Z"),
          updatedAt: new Date("2025-04-07T17:30:00Z"),
          score: 10
        },
        {
          text: "Alguma dica para implementar com MongoDB?",
          author: {
            username: "mongo_fan",
            role: "USER"
          },
          createdAt: new Date("2025-04-07T18:15:00Z"),
          updatedAt: new Date("2025-04-07T18:15:00Z"),
          score: 3
        }
      ],
      score: 53
    }
  ]);

  // Track vote state for each post
  const [voteStates, setVoteStates] = useState<Record<string, 'up' | 'down' | null>>({});

  const handleUpvote = (slug: string) => {
    console.log(`Upvoting post: ${slug}`);
    
    // Get current vote state for this post
    const currentVote = voteStates[slug];
    
    // Determine new vote state and score adjustment
    let newVoteState: 'up' | 'down' | null = null;
    let scoreAdjustment = 0;
    
    if (currentVote === 'up') {
      // If already upvoted, remove upvote
      newVoteState = null;
      scoreAdjustment = -1;
    } else if (currentVote === 'down') {
      // If downvoted, switch to upvote
      newVoteState = 'up';
      scoreAdjustment = 2; // Remove downvote (-1) and add upvote (+1)
    } else {
      // If not voted, add upvote
      newVoteState = 'up';
      scoreAdjustment = 1;
    }
    
    // Update vote state
    setVoteStates({
      ...voteStates,
      [slug]: newVoteState
    });
    
    // Update post score
    setPosts(posts.map(post => 
      post.slug === slug 
        ? { ...post, score: post.score + scoreAdjustment } 
        : post
    ));
  };

  const handleDownvote = (slug: string) => {
    console.log(`Downvoting post: ${slug}`);
    
    // Get current vote state for this post
    const currentVote = voteStates[slug];
    
    // Determine new vote state and score adjustment
    let newVoteState: 'up' | 'down' | null = null;
    let scoreAdjustment = 0;
    
    if (currentVote === 'down') {
      // If already downvoted, remove downvote
      newVoteState = null;
      scoreAdjustment = 1;
    } else if (currentVote === 'up') {
      // If upvoted, switch to downvote
      newVoteState = 'down';
      scoreAdjustment = -2; // Remove upvote (-1) and add downvote (-1)
    } else {
      // If not voted, add downvote
      newVoteState = 'down';
      scoreAdjustment = -1;
    }
    
    // Update vote state
    setVoteStates({
      ...voteStates,
      [slug]: newVoteState
    });
    
    // Update post score
    setPosts(posts.map(post => 
      post.slug === slug 
        ? { ...post, score: post.score + scoreAdjustment } 
        : post
    ));
  };

  return (
    <main className="p-6">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/newPost" className="text-blue-600 hover:underline">Novo Post</Link>
        </div>
      </div>

      <ul className="space-y-4">
        {posts.map(post => (
          <PostCard 
            key={post.slug}
            post={post}
            voteState={voteStates[post.slug] || null}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />
        ))}
      </ul>
    </main>
  );
}