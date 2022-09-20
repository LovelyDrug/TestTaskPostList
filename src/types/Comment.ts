export interface Comment {
  id: number,
  postId: number,
  body: string,
}

export type CommentData = Omit<Comment, 'id'>;
