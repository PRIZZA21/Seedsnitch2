import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPostById,  upvotePost } from '../../redux/actions/postsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createReply, listReplies, upvoteReply } from '../../redux/actions/repliesActions'


const Replies = () => {


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const postByid = useSelector((state) => state.getPostById)
    const { post } = postByid

  const repliesList = useSelector((state) => state.repliesList)
  const {  replies } = repliesList

  
  const dispatch = useDispatch();
  var full_url = document.URL; // Get current url
  var url_array = full_url.split('/') // Split the string into an array with / as separator
  var last_segment = url_array[url_array.length-2];

  const [reply,setReply] = useState('')

  const upvoteHandler = (id) =>{
    dispatch(upvotePost(id));
    window.location.reload();
  }

  const upvoteReplyHandler = (id) =>{
    dispatch(upvoteReply(id));
    window.location.reload();
  }

  const reply_handler = (id) =>{
    dispatch(createReply(id,reply));
    window.location.reload();
  }


  
  useEffect( 
    () => { 
        dispatch(getPostById(last_segment)) 
        dispatch(listReplies(last_segment))
    },  [dispatch,last_segment]
  )




  return (
  
    <div className="mt-24 mx-auto faq-body gap-x-8 h-[auto] flex flex-col items-center justify-center px-4 md:px-0 md:gap-x-16 w-full pb-12">
      {/* Hi {userInfo.name.split(" ")[0]} */}

      <div className='container'>

     
        
        <div>
            { post &&  <div className="post-card" key={post._id}>
                  
                  <details >
                      <summary className='post-card-title'>
                        {post.title}.
                        <span className="post-open-icon ml-2">
                        
                          <FontAwesomeIcon icon={faCaretDown} className="px-2 cursor-pointer" />
                        </span>
                        
                        
                        {/* <span className="post-open-icon ml-2"><i className="fa-sharp fa-solid fa-envelope"></i></span> */}
                      </summary>
                      <div className='post-card-author'>
                        Posted By: {post.author && post.author.name}
                      </div>
                      <div className="post-card-description">
                        {post.description}
                      </div>
                  </details>
                  
                  <div className='mt-4' >
                    <span className='font-normal text-teal' >
                    <FontAwesomeIcon icon={faThumbsUp} className="px-2 cursor-pointer" onClick={() => upvoteHandler(post._id) }/> Like | {post.upvotes && post.upvotes.length}
                    </span>

                  </div>
                  
                  
        </div>
            }


        { userInfo && 
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-3/4 px-3 flex flex-row justify-between">
                <input
                  className="appearance-none block w-full bg-gray-100 text-darkBlue border border-grabg-gray-100 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-reply"
                  type="text"
                  name="reply"
                  required
                  placeholder="Enter your reply"
                  onChange={(e)=>setReply(e.target.value)}
                />
                <div className='flex flex-row justify-center px-4 items-center'>
                  {post && <FontAwesomeIcon icon={faPaperPlane} className="px-2 cursor-pointer" onClick={() => reply_handler(post._id) }/>}
                </div>
                
              </div>
            </div>
        }




            {replies && replies.map((reply)=>(
                <div className='reply-card'>
                    <span className="reply-card-title block">{reply.author && reply.author.name}</span>
                    {reply.comment}

                    <div className='mt-4' >
                        <span className='font-normal text-teal' >
                        <FontAwesomeIcon icon={faThumbsUp} className="px-2 cursor-pointer" onClick={() => upvoteReplyHandler(reply._id) }/> Like | {reply.upvotes && reply.upvotes.length}
                        </span>
                  </div>

                </div>
            ))}



        </div>
          
          
      </div>
    </div>
   
  )
}

export default Replies
