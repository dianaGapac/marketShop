import { selectItem } from '../actions/cartActions'
import {CART_ADD_ITEM, CART_REMOVE_ITEM, PASS_SELECTED_ITEM,} from '../constants/cartConstants'


export const cartReducer = (state ={cartItems: [], selectedItemsState:[]},action) => {
    switch(action.type){
        case CART_ADD_ITEM:

            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if(existItem)
            {
                console.log('add To cart again qty' ,item.qty)
                return{
                    ...state,
                    cartItems: state.cartItems.map( (x) => x.product === existItem.product ?
                        item: x)
                }

            }else{
                console.log('add To cart new qty' ,item.qty)

                return {
                    
                    ...state,   
                    cartItems: [...state.cartItems,item] 
                }
            }
        case CART_REMOVE_ITEM: 
             return{
                 ...state,
                 cartItems: state.cartItems.filter( x=> x.product != action.payload)
             }
        
        case PASS_SELECTED_ITEM:
            return{
                ...state,
                selectedItemsState: action.payload.selected
            }

        default:
            return state
    }

}

