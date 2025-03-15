import { createSlice } from "@reduxjs/toolkit";

const ShowMenu = createSlice({
    name:'ShowMenu',
    initialState:{
        value:true,
        filterToggle:true
    },
    reducers:{
        setShowMenu:(state,action)=>{
            state.value =action.payload
        },
        filterToggle:(state,action)=>{
            state.filterToggle = !action.payload
        }
    }
})

export const showmenu =ShowMenu.reducer;
export const {setShowMenu,filterToggle} = ShowMenu.actions