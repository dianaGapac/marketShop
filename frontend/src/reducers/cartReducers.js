import {CART_ADD_ITEM, 
        CART_REMOVE_ITEM,
        PASS_SELECTED_ITEM, 
        CART_SAVE_SHIPPING_ADDRESS,
        CART_SAVE_PAYMENT_METHOD,
        CART_SELECT_SIZE,
        CART_DESELECT_SIZE

        } from '../constants/cartConstants'


export const cartReducer = (state ={cartItems: [], selectedItems:[], shippingAddress:{}},action) => {
    switch(action.type){
        case CART_ADD_ITEM:

            const item = action.payload
            const existItem = state.cartItems.find((x,index) => x.product === item.product && x.size === item.size)
     

            if(existItem)
            {
             
                return{
                    ...state,
                    cartItems: state.cartItems.map( (x) => x.product === existItem.product  && x.size === item.size?
                        item: x)
                }

            }else{
                return {
                    
                    ...state,   
                    cartItems: [...state.cartItems,item] 
                }
            }
        case CART_REMOVE_ITEM: 
              
            console.log('index in reducer:', action.payload)
            console.log('length',state.cartItems.length)

            if(state.cartItems.length <= 1)
            {
                return{
                    ...state,
                    cartItems:[]
                }
            }
            else{
                return{
                    ...state,
                    cartItems: state.cartItems.filter( (x , index) => index !== action.payload )
                }
            }
                

           
        
        case PASS_SELECTED_ITEM:
            return{
                ...state,
                selectedItems: action.payload.selected
                
            }
        case CART_SAVE_SHIPPING_ADDRESS: 
            return{
                ...state,
                shippingAddress: action.payload
            }     
        case CART_SAVE_PAYMENT_METHOD: 
            return{
                ...state,
                paymentMethod: action.payload
            }                         

        default:
            return state
    }

}

