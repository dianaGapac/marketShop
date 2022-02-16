import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILED,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILED,
    ORDER_PAY_RESET,
    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAILED,
    MY_ORDER_LIST_RESET,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAILED,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAILED,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_RESET,
    ORDER_RECEIVED_REQUEST,
    ORDER_RECEIVED_SUCCESS,
    ORDER_RECEIVED_FAILED,


} from '../constants/orderConstants'

export const orderCreateReducer = (state= {}, action ) => {
        switch(action.type) {
            case ORDER_CREATE_REQUEST:
                return {
                    loading: true,
                }
            case ORDER_CREATE_SUCCESS:
                return{
                    loading: false,
                    success: true,
                    order: action.payload
                }   
            case ORDER_CREATE_FAILED:
                return{
                    loading:false,
                    error: action.payload  
                }
            default:
                return state
        }
}

export const orderDetailsReducer = (state= {loading:true, orderItems:[], shippingAddress:{}}, action ) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                order: action.payload
            }   
        case ORDER_DETAILS_FAILED:
            return{
                loading:false,
                error: action.payload  
            }
        case ORDER_DETAILS_RESET:
             return {}

                   
        default:
            return state
    }
}

 
export const orderPayReducer = (state= {}, action ) => {
    switch(action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return{
                loading: false,
                success: true
            }   
        case ORDER_PAY_FAILED:
            return{
                loading:false,  
                error: action.payload  
            }
        case ORDER_PAY_RESET:   
            return{}

        default:
            return state
    }
}

export const myOrderListReducer = (state= {}, action ) => {
    switch(action.type) {
        case MY_ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case MY_ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }   
        case MY_ORDER_LIST_FAILED:
            return{
                loading:false,  
                error: action.payload  
            }
        case MY_ORDER_LIST_RESET:
            return{ orders:[] }

        default:
            return state
    }
}


export const orderListReducer = (state= {}, action ) => {
    switch(action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return{
                loading: false,
                orders: action.payload
            }   
        case ORDER_LIST_FAILED:
            return{
                loading:false,  
                error: action.payload  
            }
        default:
            return state
    }
}

 
export const orderDeliverReducer = (state= {}, action ) => {
    switch(action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return{
                loading: false,
                success: true
            }   
        case ORDER_DELIVER_FAILED:
            return{
                loading:false,  
                error: action.payload  
            }
        case ORDER_DELIVER_RESET:   
            return{}

        default:
            return state
    }
}


export const orderReceivedReducer = (state= {}, action ) => {
    switch(action.type) {
        case ORDER_RECEIVED_REQUEST:
            return {
                loading: true
            }
        case ORDER_RECEIVED_SUCCESS:
            return{
                loading: false,
                success: true
            }   
        case ORDER_RECEIVED_FAILED:
            return{
                loading:false,  
                error: action.payload  }
        default:
            return state
    }
}