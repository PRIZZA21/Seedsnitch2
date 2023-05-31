import { CREATE_INCUBATOR_FAIL, CREATE_INCUBATOR_REQUEST, CREATE_INCUBATOR_SUCCESS, GET_INCUBATORS_FAIL, GET_INCUBATORS_REQUEST, GET_INCUBATORS_SUCCESS } from "../constants/incubatorsConstants"


export const incubatorListReducr = (state={incubators:[]},action) =>{
    switch (action.type) {
        case GET_INCUBATORS_REQUEST: return {loading:true, incubators:[]}
        case GET_INCUBATORS_SUCCESS: return {loading:false, incubators:action.payload.incubators,pages:action.payload.pages,page:action.payload.page}
        case GET_INCUBATORS_FAIL   : return {loading:false, error:action.payload}
        default                    : return state
    }
}

export const incubatorCreateReducer = (state={},action) =>{
    switch (action.type) {
        case CREATE_INCUBATOR_REQUEST: return {loading:true, incubator:{}}
        case CREATE_INCUBATOR_SUCCESS: return {loading:false, incubator:action.payload}
        case CREATE_INCUBATOR_FAIL   : return {loading:false, error:action.payload}
        default                      : return state
    }
}
