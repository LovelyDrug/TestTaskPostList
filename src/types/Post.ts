export interface Post {
  id: number,
  title: string,
  body: string,
}
export interface PostWithComment extends Post {
  comment: Comment[],
}

export type PostData = Omit<Post, 'id'>;
