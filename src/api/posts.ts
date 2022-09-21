import { data } from "../fetchData"
import { Post, PostData, PostWithComment } from "../types/Post";

export const getPosts = () => {
  return data.get<Post[]>('/posts');
};

export const createPost = (postData: PostData) => {
  return data.post<Post>('/posts', postData);
}

export const deletePost = (postId: number) => {
  return data.delete<Post>(`/posts/${postId}`);
}

export const updatePost = (postId: number, newPostData: PostData) => {
  return data.put<Post>(`/posts/${postId}`, newPostData);
}
