"use client";

import Link from "next/link";
import type { PostDetailsResponseDTO } from "../../types";
import { VoteButton } from "./votes/vote";

interface PostCardProps {
  post: PostDetailsResponseDTO;
  voteState: 'up' | 'down' | null;
  onUpvote: (slug: string) => void;
  onDownvote: (slug: string) => void;
}

export default function PostCard({ post, voteState, onUpvote, onDownvote }: PostCardProps) {
  return (
    <li className="border p-4 rounded-xl shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-row gap-4">
        {/* Score column with up/down chevrons */}
        <div className="flex flex-col items-center justify-center min-w-[60px]">
          <VoteButton 
            type="up"
            isActive={voteState === 'up'}
            onClick={() => onUpvote(post.slug)}
          />
          <span className="font-bold text-lg my-1 text-tertiary-300 dark:text-white">{post.score}</span>
          <VoteButton 
            type="down"
            isActive={voteState === 'down'}
            onClick={() => onDownvote(post.slug)}
          />
        </div>

        {/* Post content */}
        <div className="flex flex-col gap-2 flex-grow">
          <Link href={`/post/${post.slug}`} className="text-xl font-semibold hover:underline text-primary-200 dark:text-primary-600">
            {post.title}
          </Link>
          <div className="flex flex-row gap-2 justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">{post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}</p>
          </div>

          {/* Post footer with author, date and comment count */}
          <div className="flex flex-row gap-4 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 px-2">
            <span>Publicado por: <span className="font-medium">{post.author.username}</span></span>
            <span>{post.createdAt.toISOString().split('T')[0]}</span>
            <span>
              {post.comments.length > 0 
                ? `${post.comments.length} ${post.comments.length === 1 ? 'comentário' : 'comentários'}` 
                : 'Sem comentários'}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
} 