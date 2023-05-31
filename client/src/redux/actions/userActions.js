import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,  USER_GOOGLE_LOGIN_REQUEST, USER_GOOGLE_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstants"

export const login = (email,password) => async(dispatch) => {
    
    try {
        
        
        dispatch({type: USER_LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/users/signin',{email,password},config)
        
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error
            : error.message,
            })
        }
}


export const login_google = (obj) => async(dispatch) => {
    try {
        
        dispatch({type: USER_GOOGLE_LOGIN_REQUEST})

        if(obj.name){
        dispatch({
            type: USER_GOOGLE_LOGIN_SUCCESS,
            payload: obj
        })
        
        localStorage.setItem('userInfo',JSON.stringify(obj))}

    } catch (error) {
       
        }
    }


// function removeCookie() {
//     const [cookies, setCookie, removeCookie] = useCookies(['session']);
//   }
  

// function handleLogout() {
    
//       .then((response) => {
//         // handle successful logout
//       })
//       .catch((error) => {
//         // handle error
//       });
//   }

export const logout = () => (dispatch) =>{
    // handleLogout()
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    window.open('/api/users/glogout',"_self")
    // axios.post('/api/users/logout')
}

export const register = (name,email,password) => async(dispatch) => {
    try {
        
        dispatch({type: USER_REGISTER_REQUEST})

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const {data} = await axios.post('/api/users/signup',{name,email,password},config)
        
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error
            : error.message,
            })
        }
}


export const updateUserProfile = (user) => async(dispatch,getState) => {
    try {
        dispatch({type: USER_UPDATE_PROFILE_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        const { data } = await axios.put(`/api/users/profile`,user, config)
      
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error
            : error.message,
        })
    }
}




export const getUserDetails = (id) => async(dispatch,getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST})
        
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        const { data } = await axios.get(`/api/users/profile`, config)
      
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error
        })
    }
}
