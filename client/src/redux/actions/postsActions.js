import axios from 'axios'
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POST_BY_ID_FAIL, GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS, POST_UPVOTE_FAIL, POST_UPVOTE_REQUEST, POST_UPVOTE_SUCCESS } from '../constants/postsConstants'

export const listPosts = () => async(dispatch) => {

    try {
        
        
        dispatch({type: GET_POSTS_REQUEST})
        const {data}= await axios.get(`/api/posts/`)
     
        
        dispatch({
            type: GET_POSTS_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {
        dispatch({
            type: GET_POSTS_FAIL,
            payload: error
        })
    }
}

export const createPost = (title,description) => async(dispatch,getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
    
        

        dispatch({type: CREATE_POST_REQUEST})
        const {data}= await axios.post(`/api/posts/create`,{title,description},config)


        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {

        
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error
        })
    }
}

export const upvotePost = (post_id) => async(dispatch,getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
    

        dispatch({type: POST_UPVOTE_REQUEST})
        const {data}= await axios.put(`/api/posts/like/${post_id}`,{},config)
        

        dispatch({
            type: POST_UPVOTE_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {
  
        
        dispatch({
            type: POST_UPVOTE_FAIL,
            payload: error
        })
    }
}


export const getPostById = (id) => async(dispatch) => {

    try {
        
        dispatch({type: GET_POST_BY_ID_REQUEST})
        const {data}= await axios.get(`/api/posts/${id}`)
     
        
        dispatch({
            type: GET_POST_BY_ID_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {
        dispatch({
            type: GET_POST_BY_ID_FAIL,
            payload: error
        })
    }
}

