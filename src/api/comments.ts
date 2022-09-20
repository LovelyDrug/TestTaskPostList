import { data } from "../fetchData"
import { Comment, CommentData } from "../types/Comment";

export const getComments = () => {
  return data.get<Comment[]>('/comments');
};

export const createComment = (commentData: CommentData) => {
  return data.post<Comment>('/comments', commentData);
}

export const deleteComment = (commentId: number) => {
  return data.delete<Comment>(`/comments/${commentId}`);
}

export const updateComment = (commentId: number, newCommentData: CommentData) => {
  return data.put<Comment>(`/comments/${commentId}`, newCommentData);
}
