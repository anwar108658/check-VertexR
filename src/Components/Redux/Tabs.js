import { createSlice } from "@reduxjs/toolkit";

const Tabs = createSlice({
  name: 'Tabs',
  initialState: {
    tabs: [],
    activeTab: null,
    dataIsFetched:true
  },
  reducers: {
    setTabs: (state, action) => {
        const { name, data, id, type } = action.payload;
        const newTab = {
          name,
          data,
          id,
          type,
        };
        
        if (type !== 'tab') {
          state.tabs.push(newTab);
          state.activeTab = newTab;
        } else {
          const clickedTab = state.tabs.find(tab => tab.id == id);
          if (clickedTab) {
            state.activeTab = clickedTab;
          }
        }
      },
      
    removetab: (state, action) => {
      const updatedTabs = state.tabs.filter((item) => item.id !== action.payload);
      state.tabs = updatedTabs;
      if (state.activeTab && state.activeTab.id === action.payload) {
        if (updatedTabs.length > 0) {
          state.activeTab = updatedTabs[updatedTabs.length - 1]; 
        } else {
          state.activeTab = null; 
        }
      }
    },

    setDataIsFetched:(state,action)=>{
      state.dataIsFetched = action.payload;
    }

  },
});

export default Tabs;

export const tabs = Tabs.reducer;
export const { setTabs, removetab,setDataIsFetched } = Tabs.actions;

