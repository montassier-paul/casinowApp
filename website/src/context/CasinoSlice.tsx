import { createSlice } from '@reduxjs/toolkit'
import { propsCasino, propsStateCasinos } from '../interface'
import { fetchCasinos, putVote } from "./apiManager"




const initialState: propsStateCasinos = {

  status: "idle",
  casinos: null

}

export const casinosSlice = createSlice({
  name: 'apiCasinos',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCasinos.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchCasinos.fulfilled, (state, action) => {
        state.status = 'complete'
        state.casinos = action.payload.data
      })
      .addCase(fetchCasinos.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message
      })

      .addCase(putVote.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(putVote.fulfilled, (state, action : {payload : { data : {data : propsCasino}, id : string}}) => {
        state.status = 'complete'
        if(state.casinos){
          state.casinos = state.casinos.map((casino) => {
            if(casino._id === action.payload.id){
              console.log(action.payload.data.data)
              return action.payload.data.data
            }
            return casino})
        }
        
      })
      .addCase(putVote.rejected, (state, action) => {
        state.status = 'failed'
        // state.error = action.error.message
      })
  },

  reducers: {

  }
})

export const { } = casinosSlice.actions

export default casinosSlice.reducer