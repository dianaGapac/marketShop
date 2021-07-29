import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'


export const cartReducer = (state ={cartItems: []},action) => {
    switch(action.type){
        case CART_ADD_ITEM:

            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            console.log('initial cartItems')
            console.log(state.cartItems)


            if(existItem)
            {
                console.log('exists')
                console.log(existItem)
                console.log(state.cartItems)

                return{
                    ...state,
                    cartItems: state.cartItems.map( (x) => x.product === existItem.product ?
                        item: x)

                     
                }

            }else{
                console.log('pushed to cartItems')
                return {
                    
                    ...state,   
                    cartItems: [...state.cartItems,item] 
                }
            }
        
        default:
            return state
    }

}


//to do qty adds up when item already exists