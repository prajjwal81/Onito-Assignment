import { configureStore } from "@reduxjs/toolkit"
import AddressSlice from "../Component/AddressSlice"
import FormSlice from "../Component/FormSlice"

export const store = configureStore({
    reducer:{
        form:FormSlice,
        address:AddressSlice
    }
 })