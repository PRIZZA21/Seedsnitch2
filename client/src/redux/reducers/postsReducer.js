import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POST_BY_ID_FAIL, GET_POST_BY_ID_REQUEST, GET_POST_BY_ID_SUCCESS, POST_UPVOTE_FAIL, POST_UPVOTE_REQUEST, POST_UPVOTE_SUCCESS } from "../constants/postsConstants"

export const postListReducer = (state={posts:[]},action) =>{
    switch (action.type) {
        case GET_POSTS_REQUEST: return {loading:true, posts:[]}
        case CREATE_POST_REQUEST: return {...state, loading:true}
        case GET_POSTS_SUCCESS: return {...state,loading:false, posts:action.payload}
        case GET_POSTS_FAIL   : return {  loading:false, error:action.payload }
        case CREATE_POST_SUCCESS: return {...state,loading:false, posts:[...state.posts, action.payload]}
        case CREATE_POST_FAIL   : return {...state, loading:false, error:action.payload}
        case POST_UPVOTE_REQUEST: return {...state,loading:true}
        case POST_UPVOTE_SUCCESS: 
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        upvotes: action.payload.upvotes
                    };
                }
                return post;
            });
            return {...state,loading:false, posts:updatedPosts}
        case POST_UPVOTE_FAIL   : return {...state,loading:false, error:action.payload}
        default               : return state
    }
}


// export const postUpvoteReducer = (state={},action) =>{
//     switch (action.type) {
        
        
        
//         default               : return state
//     }
// }


export const getPostByIdReducer = (state={post:{}},action) =>{
    switch (action.type) {
        case GET_POST_BY_ID_REQUEST: return {loading:true, post:{}}
        case GET_POST_BY_ID_SUCCESS: return {loading:false, post:action.payload}
        case GET_POST_BY_ID_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}

