import React from 'react';

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

export const VoteButton: React.FC<VoteButtonProps> = ({ type, isActive, onClick }) => {
  const activeColor = type === 'up' ? 'text-yellow-500' : 'text-red-500';
  const inactiveColor = 'text-gray-500 hover:text-primary-600';
  
  return (
    <button 
      className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${
        isActive ? activeColor : inactiveColor
      }`}
      onClick={onClick}
    >
      {type === 'up' ? <UpChevron /> : <DownChevron />}
    </button>
  );
};
