import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './redux/reducers/userReducers'
import { getPostByIdReducer, postListReducer } from './redux/reducers/postsReducer'
import { repliesListReducer, replyUpvoteReducer } from './redux/reducers/repliesReducer'
import { applicationCreateReducer, applicationListReducr, applicationsofCreatorListReducr, applicationsofIncubatorListReducr } from './redux/reducers/applicationsReducer'
import { incubatorCreateReducer, incubatorListReducr } from './redux/reducers/incubatorsReducer'

const reducer = combineReducers({
    userLogin   : userLoginReducer,
    userRegister: userRegisterReducer,
    postsList   : postListReducer,
    repliesList: repliesListReducer,
    getPostById: getPostByIdReducer,
    replyUpvote: replyUpvoteReducer,
    applicationsList   : applicationListReducr,
    applicationCreate : applicationCreateReducer,
    incubatorsList   : incubatorListReducr,
    incubatorCreate : incubatorCreateReducer,
    userApplications: applicationsofCreatorListReducr,
    userProfileUpdate       : userUpdateProfileReducer,
    userDetails      : userDetailsReducer,
    incubatorApplications      : applicationsofIncubatorListReducr,
})

const userInfoFromStorage = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')): null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store