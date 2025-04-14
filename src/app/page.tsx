"use client";
import Link from "next/link";
import type { PostDetailsResponseDTO } from "../types";
import { useState, useEffect } from "react";
import PostCard from "./components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<Array<PostDetailsResponseDTO>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data); // Assuming the response data is an array of posts
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
          <Link href="/newPost">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Novo Post
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
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
      )}
    </main>
  );
}