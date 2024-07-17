import { createSlice } from '@reduxjs/toolkit'

const CartSlice= createSlice({
    name:"cart",
    initialState:{
        flag:true,
    },
    reducers:{
        toggle:(state,action)=>{
           state.flag=(!state.flag)
        }
    }
})

export const{toggle}=CartSlice.actions;
export default CartSlice.reducer;