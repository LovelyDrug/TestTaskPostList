import { Button, Input } from "@mui/material";
import React, { FC, useState } from "react";

interface Props {
  onCreatePost: (title: string, body: string) => void,
}

export const NewPostForm: FC<Props> = (props) => {
  const { onCreatePost } = props;

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      onCreatePost(newPostTitle, newPostBody);
      setNewPostTitle('');
      setNewPostBody('');
    }}>
      <Input 
        placeholder="Title"
        className='formInput'
        value={newPostTitle}
        onChange={(event) => setNewPostTitle(event.target.value)}
      />
      <Input 
        placeholder="Info"
        className='formInput'
        value={newPostBody}
        onChange={(event) => setNewPostBody(event.target.value)}
      />
      <Button type='submit' variant="outlined">
        Create new Post
      </Button>
    </form>
  )
};
