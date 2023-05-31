import axios from 'axios'
import { CREATE_INCUBATOR_FAIL, CREATE_INCUBATOR_REQUEST, CREATE_INCUBATOR_SUCCESS, GET_INCUBATORS_FAIL, GET_INCUBATORS_REQUEST, GET_INCUBATORS_SUCCESS } from '../constants/incubatorsConstants'

export const listIncubators = (pageNumber = '') => async(dispatch) => {

    try {
        
        
        dispatch({type: GET_INCUBATORS_REQUEST})
        const {data}= await axios.get(`http://localhost:4000/api/incubators?pageNumber=${pageNumber}`)
   
        dispatch({
            type: GET_INCUBATORS_SUCCESS,
            payload: data
        })   


    } 
    
    catch (error) {
       
        dispatch({
            type: GET_INCUBATORS_FAIL,
            payload: error
        })
    }
}

export const createIncubator = (name,email) => async(dispatch,getState) => {

    try {

        dispatch({type: CREATE_INCUBATOR_REQUEST})
        const {data}= await axios.post(`http://localhost:4000/api/incubators/create`,{name,email})
        
  
        dispatch({
            type: CREATE_INCUBATOR_SUCCESS,
            payload: data
        })   


    } 
    
    catch (error) {
       
        
        dispatch({
            type: CREATE_INCUBATOR_FAIL,
            payload: error
        })
    }
}
