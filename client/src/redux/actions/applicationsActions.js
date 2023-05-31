import { CREATE_APPLICATION_FAIL, CREATE_APPLICATION_REQUEST, CREATE_APPLICATION_SUCCESS, GET_APPLICATIONS_FAIL, GET_APPLICATIONS_REQUEST, GET_APPLICATIONS_SUCCESS, GET_APPLICATION_CREATOR_FAIL, GET_APPLICATION_CREATOR_REQUEST, GET_APPLICATION_CREATOR_SUCCESS, GET_APPLICATION_INCUBATOR_REQUEST, GET_APPLICATION_INCUBATOR_SUCCESS } from "../constants/applicationsConstants"
import axios from 'axios'

export const listApplications = (keyword = '',pageNumber = '') => async(dispatch) => {

    try {
        
        
        dispatch({type: GET_APPLICATIONS_REQUEST})
        const {data}= await axios.get(`/api/applications?keyword=${keyword}&pageNumber=${pageNumber}`)
    
        
        dispatch({
            type: GET_APPLICATIONS_SUCCESS,
            payload: data
        })   

    
        
    } 
    
    catch (error) {
      
        dispatch({
            type: GET_APPLICATIONS_FAIL,
            payload: error
        })
    }
}

export const createApplication = (name,email,startup_name,linkedin_profile,college_name,contact_number,start_up_stage,start_up_description,start_up_problem,start_up_differentiator) => async(dispatch,getState) => {

    try {



        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }



        dispatch({type: CREATE_APPLICATION_REQUEST})
        const {data}= await axios.post(`/api/applications/create`,{name,email,startup_name,linkedin_profile,college_name,contact_number,start_up_stage,start_up_description,start_up_problem,start_up_differentiator},config)
        

        
        dispatch({
            type: CREATE_APPLICATION_SUCCESS,
            payload: data
        })   

    
    } 
    
    catch (error) {
      
        
        dispatch({
            type: CREATE_APPLICATION_FAIL,
            payload: error
        })
    }
}



export const listUserApplications = (pageNumber = '') => async(dispatch,getState) => {

    try {
        
        
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }
        
        dispatch({type: GET_APPLICATION_CREATOR_REQUEST})
        const {data}= await axios.get(`/api/applications/creator/${userInfo._id}?pageNumber=${pageNumber}`,config)
   
        dispatch({
            type: GET_APPLICATION_CREATOR_SUCCESS,
            payload: data
        })   

    
        
    } 
    
    catch (error) {
    
        dispatch({
            type: GET_APPLICATION_CREATOR_FAIL,
            payload: error
        })
    }
}

export const listIncubatorApplications = () => async(dispatch,getState) => {

    try {
        
        const {
            userLogin: { userInfo },
        } = getState()
      
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`,
            },
        }

        dispatch({type: GET_APPLICATION_INCUBATOR_REQUEST})
        const {data}= await axios.get(`/api/applications/incubator/`,config)
   
        dispatch({
            type: GET_APPLICATION_INCUBATOR_SUCCESS,
            payload: data
        })   

    
        
    } 
    
    catch (error) {
    
        dispatch({
            type: GET_APPLICATION_CREATOR_FAIL,
            payload: error
        })
    }
}