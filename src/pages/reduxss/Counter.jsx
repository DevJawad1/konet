// import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const counters = createSlice({
    name:"counter",
    initialState:{
        count:0,
    },
    myName:"Kunle",
    reducers:{
        increment:(state)=>{
            state.count+=1
        },
        decrement:(state)=>{
            state.count-=1
        }
    }
})
export const {increment, decrement} = counters.actions
export default counters.reducer