import { createSlice } from "@reduxjs/toolkit";

const UsefulLinks = createSlice({
  name: 'UsefulLinks',
  initialState: {
    links: null
  },
  reducers: {
    setUsefulLInks: (state, action) => {
      state.links = action.payload
    }
  }
})

export const usefulLinks = UsefulLinks.reducer;
export const { setUsefulLInks } = UsefulLinks.actions;