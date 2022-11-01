import { createSlice } from '@reduxjs/toolkit'
import { propsStateUser } from '../interface'



const initialState : propsStateUser = {

   queryCasino :'', 
   queryGame: ''

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    updateQueryCasino: (state, action : {payload : string} ) => {
        // console.log(action.payload)
        state.queryCasino = action.payload;     
    },

    updateQueryGame: (state, action : {payload : string}) => {
      state.queryGame = action.payload; 
    }

  }
})

export const { updateQueryCasino, updateQueryGame } = userSlice.actions

export default userSlice.reducer