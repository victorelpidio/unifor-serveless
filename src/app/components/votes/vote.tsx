import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

// Chevron components
export const UpChevron = ({ className = "" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-6 w-6 ${className}`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export const DownChevron = ({ className = "" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={`h-6 w-6 ${className}`} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Vote button component
interface VoteButtonProps {
  type: 'up' | 'down';
  isActive: boolean;
  onClick: () => void;
}

export function VoteButton({ type, isActive, onClick }: VoteButtonProps) {
  const Icon = type === 'up' ? ChevronUpIcon : ChevronDownIcon;
  const activeColor = type === 'up' ? 'text-green-500' : 'text-red-500';
  const inactiveColor = 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300';

  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full transition-colors ${isActive ? activeColor : inactiveColor}`}
      aria-label={`${type === 'up' ? 'Upvote' : 'Downvote'} post`}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}
