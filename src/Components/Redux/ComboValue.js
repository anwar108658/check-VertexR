import { createSlice } from "@reduxjs/toolkit";

export const comboValue = createSlice({
    name:'ComboValue',
    initialState:{
        value:''
    },
    reducers:{
        setCombovalue:(state,action)=>{
            state.value =action.payload
        }
    }
})

export const {setCombovalue} =comboValue.actions;