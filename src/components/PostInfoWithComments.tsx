import { Button, Card, CardActions, CardContent, Input, List, ListItem, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteComment, createComment, getComments } from "../api/comments";
import { Comment, CommentData } from "../types/Comment";
import { Post } from "../types/Post";

interface Props {
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
}

export const PostInfo: FC<Props> = (props) => {
  const { posts } = props;

  const { postId = '' } = useParams();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentBody, setNewCommentBody] = useState('');
  // const [isEditing, setIsEditing] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  useEffect(() => {
    setIsInfoLoading(true);
    getComments()
    .then(comments => {
      setComments(comments);
    })
    .finally(() => {
      setIsInfoLoading(false);
    })
  }, []);
  
  const onDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId))
      })
  };

  const onCreateComment = (body: string) => {
    const commentData: CommentData = {
      postId: +postId,
      body
    };

    if (!(body.trim())) {
      console.log('Comment needs to have a body');
      return;
    }

    createComment(commentData)
      .then((comment) => {
        setComments([...comments, comment])
      });
  };
  /*  
  const onEditPost = useCallback((editedPost: Post) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts];
      const targetIndex = newPosts.findIndex(post => post.id === editedPost.id);

      if (targetIndex === -1) {
        return newPosts;
      }

      newPosts.splice(targetIndex, 1, editedPost);

      return newPosts;
    })
  }, []); */
  
  const getFilteredComments = useCallback((postId: number | null) => {
    return comments.filter(comment => comment.postId === postId);
  }, [comments]);
  
  const getSelectedPost = useCallback((postId: number) => {
    console.log(postId);
    return posts.find(post => post.id === postId) || posts[0];
  }, [postId]);

  const selectedPost = getSelectedPost(+postId);

  const selectedPostComments = getFilteredComments(+postId);

  console.log(comments, selectedPostComments)

  /* const onChangePostTitle = (newTitle: string) => {
    const newPostData: PostData = {
      title: newTitle,
      body: selectedPost?.body || '',
    };

    updatePost(+postId, newPostData)
      .then(post => {
        const postsWithoutOld = posts.filter(post => post.id !== +postId);
        setPosts([...postsWithoutOld, post]);
      });
  }; */

  return (
    <Card sx={{ minWidth: 275 }}>
      {isInfoLoading 
        ? <p>Loading</p>
        : (
          <>
            <CardContent>
              <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                {selectedPost?.title || 'Title'}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {selectedPost?.body || 'Body'}
              </Typography>
              <Typography variant="body2">
                Comments:
              </Typography>
              <List>
              {selectedPostComments.map(comment => (
                <ListItem
                  key={comment.id}
                  className="listItem"
                  secondaryAction={
                    <Button variant="outlined" type="button" onClick={() => onDeleteComment(comment.id)}>
                      Delete
                    </Button>
                  }
                >
                  {comment.body}
                </ListItem>))}
              </List>
              <form onSubmit={(event) => {
                event.preventDefault();

                onCreateComment(newCommentBody);
                setNewCommentBody('');
              }}>
                <Input 
                  placeholder="Info"
                  className='formInput'
                  value={newCommentBody}
                  onChange={(event) => setNewCommentBody(event.target.value)}
                />
                <Button type="submit">Create new Comment</Button>
              </form>
            </CardContent>
            <CardActions>
              <Button variant="outlined">
                <Link className="link" to="/">Close</Link>
              </Button>
            </CardActions>
          </>
        )
      }
      
    </Card>
  )
}
