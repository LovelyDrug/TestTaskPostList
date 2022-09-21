import { List, ListItem, Button } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/Post';
import { NewPostForm } from './NewPostForm';

interface Props {
  posts: Post[],
  onCreatePost: (title: string, body: string) => void,
  onDeletePost: (postId: number) => void
}


export const PostsList: FC<Props> = (props) => {
  const { posts, onCreatePost, onDeletePost } = props;
  
  return (
    <>
    <NewPostForm onCreatePost={onCreatePost} />
    <List>
      {posts.map(post => (
        // eslint-disable-next-line react/jsx-key
        <ListItem
          key={post.id}
          className="listItem"
          secondaryAction={
            <>
              <Button variant="outlined">
                <Link className='link' to={`/${post.id}`}>Show more</Link>
              </Button>
              <Button variant="outlined" onClick={() => onDeletePost(post.id)}>
                Delete
              </Button>
            </>
          }
        >
          {post.title}
        </ListItem>))}
      </List>
    </>
  )
}