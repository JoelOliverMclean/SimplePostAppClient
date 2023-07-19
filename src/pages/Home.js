import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../helpers/NetworkHelper'

function Home() {
    
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    apiGet("/posts").then((response) => {
      console.log(response.data)
      setPosts(response.data)
    })
  }, [])

  return (
    <div className='homePage'>
      {posts.map((post, index) => {
        return (
          <div className='post' key={post.id} onClick={() => {
            navigate(`/post/${post.id}`)
          }} > 
            <div className='title'>{post.title}</div>
            <div className='body'>{post.postText}</div>
            <div className='footer'>@{post.username} - {post.commentCount} comments</div>
          </div> 
        )
      })}
    </div>
  )
}

export default Home