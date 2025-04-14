export type UserRole = string; // Ou defina como enum se tiver valores fixos, exemplo abaixo

export interface UserResponseDTO {
  username: string;
  role: UserRole;
}

export interface CommentResponseDTO {
  text: string;
  author: UserResponseDTO;
  createdAt: string;
  updatedAt: string;
  score: number;
}

export interface PostDetailsResponseDTO {
  title: string;
  content: string;
  createdAt: string;
  slug: string;
  author: UserResponseDTO;
  comments: CommentResponseDTO[];
  score: number;
}