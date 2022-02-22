import { ORDER_CREATE_REQUEST,
     ORDER_CREATE_SUCCESS,
      ORDER_CREATE_FAILED, 
      ORDER_DETAILS_REQUEST,
      ORDER_DETAILS_SUCCESS,
      ORDER_DETAILS_FAILED,
      ORDER_PAY_SUCCESS,
      ORDER_PAY_REQUEST,
      ORDER_PAY_FAILED,
      MY_ORDER_LIST_REQUEST,
      MY_ORDER_LIST_FAILED,
      MY_ORDER_LIST_SUCCESS,
      ORDER_LIST_REQUEST,
      ORDER_LIST_SUCCESS,
      ORDER_LIST_FAILED,
      ORDER_DELIVER_SUCCESS,
      ORDER_DELIVER_FAILED,
      ORDER_DELIVER_REQUEST,
      ORDER_DELIVER_RESET,
      ORDER_RECEIVED_SUCCESS,
      ORDER_RECEIVED_FAILED,
      ORDER_RECEIVED_REQUEST,
      ORDER_REVIEW_SUCCESS,
      ORDER_REVIEW_REQUEST,
      ORDER_REVIEW_FAILED
    } from '../constants/orderConstants'
import axios from 'axios'


export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                'Content-Type' : 'application/json' ,
                Authorization: `Bearer ${userInfo.token}`
            }
         }
     //    console.log('order', order)
         
         const {data} = await axios.post('/api/orders', order,config) 

        // console.log('data',data)
      
         dispatch({
            type:  ORDER_CREATE_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_CREATE_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 
         
         const {data} = await axios.get(`/api/orders/${id}`,config)
       
      
         dispatch({
            type:  ORDER_DETAILS_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_DETAILS_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   



export const payOrder = (orderId, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                'Content-Type' : ' application/json', 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 
         
         const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult, config)
       
      
         dispatch({
            type:  ORDER_PAY_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_PAY_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   


export const listMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:  MY_ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 
         
         const {data} = await axios.get('/api/orders/myorders', config)
       
      
         dispatch({
            type: MY_ORDER_LIST_SUCCESS,    
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type: MY_ORDER_LIST_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   


export const listOrders = () => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 

         
         const {data} = await axios.get('/api/orders', config)
       
      
         dispatch({
            type: ORDER_LIST_SUCCESS,    
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type: ORDER_LIST_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   

export const deliverOrder = (orderId) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 
         
         const {data} = await axios.put(`/api/orders/${orderId}/deliver`,{}, config)
       
      
         dispatch({
            type:  ORDER_DELIVER_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_DELIVER_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   


export const receiveOrder = (orderId) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_RECEIVED_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                Authorization: `Bearer ${userInfo.token}`
            }
         } 
         
         const {data} = await axios.put(`/api/orders/${orderId}/receive`,{}, config)
       
      
         dispatch({
            type:  ORDER_RECEIVED_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_RECEIVED_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}   


export const createReview = (orderId, review, rating) => async(dispatch, getState) => {
    try {
        dispatch({
            type:  ORDER_REVIEW_REQUEST
        })

        const { userLogin: { userInfo}} = getState() 

        const config = {
            headers: { 
                'Content-Type' : 'application/json' ,
                Authorization: `Bearer ${userInfo.token}`
            }
         }
         
         const {data} = await axios.put(`/api/orders/${orderId}/review`, {review,rating},config) 
      
         dispatch({
            type:  ORDER_REVIEW_SUCCESS,
            payload: data 
         })

        }

     catch (error) {
        dispatch({
            type:  ORDER_REVIEW_FAILED,
            payload: error.response && error.response.data.message ?
                     error.response.data.message : error.message
         })
    }  
}  