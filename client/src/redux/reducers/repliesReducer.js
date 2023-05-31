import { CREATE_REPLY_FAIL, CREATE_REPLY_REQUEST, CREATE_REPLY_SUCCESS, GET_REPLIES_FAIL, GET_REPLIES_REQUEST, GET_REPLIES_SUCCESS, REPLY_UPVOTE_FAIL, REPLY_UPVOTE_REQUEST, REPLY_UPVOTE_SUCCESS } from "../constants/repliesConstants"

export const repliesListReducer = (state={replies:[]},action) =>{
    switch (action.type) {
        case GET_REPLIES_REQUEST: return {loading:true, replies:[]}
        case GET_REPLIES_SUCCESS: return {loading:false, replies:action.payload}
        case GET_REPLIES_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}


export const postCreateReducer = (state={},action) =>{
    switch (action.type) {
        case CREATE_REPLY_REQUEST: return {loading:true, reply:{}}
        case CREATE_REPLY_SUCCESS: return {loading:false, reply:action.payload}
        case CREATE_REPLY_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}

export const replyUpvoteReducer = (state={},action) =>{
    switch (action.type) {
        case REPLY_UPVOTE_REQUEST: return {loading:true, reply:{}}
        case REPLY_UPVOTE_SUCCESS: return {loading:false, reply:action.payload}
        case REPLY_UPVOTE_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}