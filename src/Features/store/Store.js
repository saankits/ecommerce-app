import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "../Slices/UserSlice"

// create  store
export const store = configureStore({
    reducer:{
        Data: UserReducer
    }
})