import React, { useEffect, useState } from 'react';
import { createPost, deletePost, getPosts } from './api/posts';
import { Post, PostData } from './types/Post';
import './App.css';
import { Grid, Paper } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { PostsList } from './components/PostsList';
import { PostInfo } from './components/PostInfoWithComments';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then(posts => {
        setPosts(posts);
      })
      .finally(() => setIsLoading(false));
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

  return (
      <div className="App">
        <Routes>
          <Route path="/">
            <Route index element={
              isLoading 
                ? <p>Loading</p>
                : (
                  <>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                      <Paper className='paperBlock' elevation={12}>
                        <PostsList
                          posts={posts}
                          onCreatePost={onCreatePost}
                          onDeletePost={onDeletePost}
                        />
                    </Paper>
                      </Grid>
                    </Grid>
                  </>
                )
            } />
            <Route path=':postId' element={
              isLoading 
                ? <p>Loading</p>
                : (
                  <>
              
                    <Grid container spacing={4}>
              
                    <Grid item xs={6}>
                    <Paper className='paperBlock' elevation={12}>
                      <PostsList
                        posts={posts}
                        onCreatePost={onCreatePost}
                        onDeletePost={onDeletePost}
                      />
                    </Paper>
                    </Grid>

                      <Grid item xs={6}>
                    <Paper className='paperBlock' elevation={12}>
                          <PostInfo setPosts={setPosts} posts={posts} />
                    </Paper>
                      </Grid>
              
                  </Grid>
                </>
              ) 
            } />
          </Route>
          
          <Route path="*" element={
            <p>Page not found</p>
          } />
        </Routes>
      </div>
  );
}

export default App;
