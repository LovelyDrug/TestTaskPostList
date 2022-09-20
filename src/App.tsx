import React, { useEffect, useState } from 'react';
import { createPost, deletePost, getPosts } from './api/posts';
import { Post, PostData } from './types/Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    getPosts()
      .then(posts => {
        setPosts(posts);
      })
  }, []);

  const onDeletePost = (postId: number) => {
    deletePost(postId)
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId))
      })
  };

  const onCreatePost = (title: string, body: string) => {
    const postData: PostData = {
      title,
      body
    };

    if (!(title.trim()) || !(body.trim())) {
      console.log('Post needs to have title and body');
      return;
    }

    createPost(postData)
      .then((post) => {
        setPosts([...posts, post])
      })
  }

  const getSelectedPost = (postId: number) => {
    return posts.find(post => post.id === postId) || null;
  };

  return (
    <div className="App">
      <form onSubmit={(event) => {
        event.preventDefault();
        onCreatePost(newPostTitle, newPostBody);
      }}>
        Title: <input
          className='formInput'
          value={newPostTitle}
          onChange={(event) => setNewPostTitle(event.target.value)}
        ></input>
        Info: <input
          className='formInput'
          value={newPostBody}
          onChange={(event) => setNewPostBody(event.target.value)}
        ></input>
        <button type='submit'>Create new Post</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2 className='postTitle'>{post.title}</h2>
            <button type='button' onClick={() => onDeletePost(post.id)}>Delete</button>
            <button type='button' onClick={() => setSelectedPostId(post.id)}>Show more</button>
          </li>
        ))}
      </ul>
      {selectedPostId && (
        <div className='Information_block'>
          <h1></h1>
        </div>
      )}
    </div>
  );
}

export default App;
