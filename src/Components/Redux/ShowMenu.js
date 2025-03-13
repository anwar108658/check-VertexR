import { createSlice } from "@reduxjs/toolkit";

const ShowMenu = createSlice({
    name:'ShowMenu',
    initialState:{
        value:true
    },
    reducers:{
        setShowMenu:(state,action)=>{
            state.value =action.payload
        }
    }
})

export const showmenu =ShowMenu.reducer;
export const {setShowMenu} = ShowMenu.actions