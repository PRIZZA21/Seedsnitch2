import { CREATE_APPLICATION_FAIL, CREATE_APPLICATION_REQUEST, CREATE_APPLICATION_SUCCESS, GET_APPLICATIONS_FAIL, GET_APPLICATIONS_REQUEST, GET_APPLICATIONS_SUCCESS, GET_APPLICATION_CREATOR_FAIL, GET_APPLICATION_CREATOR_REQUEST, GET_APPLICATION_CREATOR_SUCCESS, GET_APPLICATION_INCUBATOR_FAIL, GET_APPLICATION_INCUBATOR_REQUEST, GET_APPLICATION_INCUBATOR_SUCCESS } from "../constants/applicationsConstants"


export const applicationListReducr = (state={applications:[]},action) =>{
    switch (action.type) {
        case GET_APPLICATIONS_REQUEST: return {loading:true, applications:[]}
        case GET_APPLICATIONS_SUCCESS: return {loading:false, applications:action.payload.all_applications,pages:action.payload.pages,page:action.payload.page}
        case GET_APPLICATIONS_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}

export const applicationCreateReducer = (state={},action) =>{
    switch (action.type) {
        case CREATE_APPLICATION_REQUEST: return {loading:true, application:{}}
        case CREATE_APPLICATION_SUCCESS: return {loading:false, application:action.payload}
        case CREATE_APPLICATION_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}


export const applicationsofCreatorListReducr = (state={applications:[]},action) =>{
    switch (action.type) {
        case GET_APPLICATION_CREATOR_REQUEST: return {loading:true, applications:[]}
        case GET_APPLICATION_CREATOR_SUCCESS: return {loading:false, applications:action.payload.applications,pages:action.payload.pages,page:action.payload.page}
        case GET_APPLICATION_CREATOR_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}


export const applicationsofIncubatorListReducr = (state={applications:[]},action) =>{
    switch (action.type) {
        case GET_APPLICATION_INCUBATOR_REQUEST: return {loading:true, applications:[]}
        case GET_APPLICATION_INCUBATOR_SUCCESS: return {loading:false, applications:action.payload}
        case GET_APPLICATION_INCUBATOR_FAIL   : return {loading:false, error:action.payload}
        default               : return state
    }
}
