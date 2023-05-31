import React, { useEffect, useState } from 'react'
import {   useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../Common_Components/Loader'
import Infobar from '../../Common_Components/Infobar'


const UserReplyScreen = () => {

    const {postid} = useParams();
    const [loading,setLoading] =useState(true)
    const [post,setPost] =useState({})

    const [replies,setReplies] = useState([])

    useEffect( 
      () => { 
        setLoading(true)

        axios.get(`/api/posts/post/${postid}`).then(res=>{
          setPost(res.data)
        })
        .catch(err=>{
        })

        axios.get(`/api/replies/${postid}`).then(res=>{
          setReplies(res.data)
        })
        .catch(err=>{
        })

        setLoading(false)
      },  [postid]
    )


    if(loading) return <Loader />

    return (
  

    <div className="mx-auto faq-body gap-x-8 h-[auto] flex flex-col items-center justify-center px-4 md:px-0 md:gap-x-16 w-full pb-12">
    
          <Infobar start_text={'Replies'} end_text={'to post'} />

          <div className="post-card w-3/4 mt-12">
            <div className='post-card-title'> {post.title}  </div>
            <div className="post-card-description"> {post.description} </div>
          </div>
  
                    
    
        {replies && replies.map((reply)=>(
                <div className='reply-card' key={reply._id}>
                    <span className="reply-card-title block">{reply.author && reply.author.name}</span>
                    {reply.comment}
                </div>
        ))}   

        {
          replies.length===0 && 
          <div>
            No replies to this post right now
          </div>
        }

      </div>
   
  )
}

export default UserReplyScreen
