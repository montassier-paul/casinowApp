import { createSlice } from '@reduxjs/toolkit'
import { propsStateWebsiteData } from '../interface'
import { fetchWebsiteData } from "./apiManager"




const initialState: propsStateWebsiteData = {

  status: "idle",
  websiteData: null

}

export const websiteDataSlice = createSlice({
  name: 'apiWebsiteData',
  initialState,
  extraReducers(builder) {
    builder
      .addCase( fetchWebsiteData.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase( fetchWebsiteData.fulfilled, (state, action) => {
        state.status = 'complete'
        state.websiteData = action.payload.data
      })
      .addCase(fetchWebsiteData.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message
      })
    
  },

  reducers: {

  }
})

export const { } = websiteDataSlice.actions

export default websiteDataSlice.reducer