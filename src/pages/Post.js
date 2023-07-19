import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiDelete } from '../helpers/NetworkHelper'

function Post() {
  let { id } = useParams()
  const [post, setPost] = useState({})
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    apiGet(`/posts/byId/${id}`).then((response) => {
      setPost(response.data)
    })
    apiGet(`/comments/byPost/${id}`).then((response) => {
      setComments(response.data)
    })
  }, [id])

  const addComment = () => {
    if (newComment.trim() !== "") {
      apiPost("/comments", {
        commentBody: newComment.trim(),
        PostId: id
      }).then((response) => {
        setComments(response.data)
      })
    }
  }

  const likePost = () => {
    apiPost("/likes", {
      PostId: post.id
    }).then((response) => {
      alert("Liked post")
    })
  }

  const likeComment = (id) => {
    apiPost("/likes", {
      CommentId: id
    }).then((response) => {
      alert("Liked comment")
    })
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>@{post.username} -&nbsp;<div className='likeButton' onClick={likePost}>Like</div></div> 
        </div>
        <div className='delete' onClick={() => {
          apiDelete(`/posts/${id}`).then((response) => {
            navigate("/")
          })
        }}>Delete Post</div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type="text" placeholder='Add your comment...' autoComplete='off' onChange={(event) => setNewComment(event.target.value)} />
          <button onClick={addComment} >Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment, index) => {
            let createdDate = new Date(Date.parse(comment.createdAt))
            
            return (
              <div className='comment' key={comment.id}>
                {comment.commentBody} <br/><br/> - @{comment.username} <br/> {createdDate.toLocaleDateString()} {createdDate.toLocaleTimeString()} <br/><br/> <div  className='likeButton' onClick={() => likeComment(comment.id)}>Like</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Post