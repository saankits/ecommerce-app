import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    data : [],
    cart :[]
    // home : []
}
const userSlice = createSlice({
    name : "Data",
    initialState,
    reducers : {
        fetchData : (state,action) => {
            state.data = action.payload
        },
        // add to cart and handle Increment
        addToCart : (state, action) => {

            const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0){
                state.cart[itemIndex].qnty += 1
            }else{
                const temp = {...action.payload, qnty: 1}
                state.cart = [...state.cart, temp]
            }
            
        },
        // remove item from cart
        removeToCart : (state, action) => {
            const data = state.cart.filter((element)=>element.id !== action.payload)
            state.cart = data
        },
        // handle decrement
        reduceQuantity : (state, action) => {
            const itemindex_dec = state.cart.findIndex((item) => item.id === action.payload.id);

            if(state.cart[itemindex_dec].qnty >=1){
                state.cart[itemindex_dec].qnty -= 1
            }
        },
        //empty cart
        emptyCart : (state,action)=>{
            state.cart = []
        }
    }
})

// export const {addToCart, removeToCart, reduceQuantity, emptyCart} = cartSlice.actions;
export const {fetchData,addToCart,removeToCart,reduceQuantity,emptyCart} = userSlice.actions;
export default userSlice.reducer