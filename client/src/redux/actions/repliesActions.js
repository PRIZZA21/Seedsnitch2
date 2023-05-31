import axios from 'axios'
import { CREATE_REPLY_FAIL, CREATE_REPLY_REQUEST, CREATE_REPLY_SUCCESS, GET_REPLIES_FAIL, GET_REPLIES_REQUEST, GET_REPLIES_SUCCESS, REPLY_UPVOTE_FAIL, REPLY_UPVOTE_REQUEST, REPLY_UPVOTE_SUCCESS } from '../constants/repliesConstants';

export const listReplies = (id) => async(dispatch) => {

    try {
        
        dispatch({type: GET_REPLIES_REQUEST})
        const {data}= await axios.get(`http://localhost:4000/api/replies/${id}`)

        
        dispatch({
            type: GET_REPLIES_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {
        dispatch({
            type: GET_REPLIES_FAIL,
            payload: error
        })
    }
}

export const createReply = (id,comment) => async(dispatch,getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        

        dispatch({type: CREATE_REPLY_REQUEST})
        const {data}= await axios.post(`http://localhost:4000/api/replies/create/${id}`,{comment},config)
        
        dispatch({
            type: CREATE_REPLY_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {
        
        dispatch({
            type: CREATE_REPLY_FAIL,
            payload: error
        })
    }
}


export const upvoteReply = (reply_id) => async(dispatch,getState) => {

    try {

        const {
            userLogin: { userInfo },
        } = getState()


      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        dispatch({type: REPLY_UPVOTE_REQUEST})
        const {data}= await axios.put(`http://localhost:4000/api/replies/like/${reply_id}`,{},config)
        

        dispatch({
            type: REPLY_UPVOTE_SUCCESS,
            payload: data
        })   
    } 
    
    catch (error) {

        
        dispatch({
            type: REPLY_UPVOTE_FAIL,
            payload: error
        })
    }
}
