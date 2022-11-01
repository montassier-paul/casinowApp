import { createSlice } from '@reduxjs/toolkit'
import { propsTournament } from '../components/interface'
import { touramentsState } from '../components/interface'



const initialState: touramentsState = {
  isLoading: false,
  hasErrors: false,
  tournamentsData: [],
  tournamentsStillData: true,

}


const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState: initialState,
  reducers: {
    getTournaments: state => {
      state.isLoading = true
    },
    getTournamentsSuccess: (state, { payload }: { payload: { data: propsTournament[], stillData: boolean } }) => {
      state.tournamentsData = payload.data
      state.tournamentsStillData = payload.stillData
      state.isLoading = false
      state.hasErrors = false
    },
    getAddTournamentsSuccess: (state, { payload }: { payload: { data: propsTournament[], stillData: boolean } }) => {
      state.tournamentsData = [...state.tournamentsData, ...payload.data]
      state.tournamentsStillData = payload.stillData
      state.isLoading = false
      state.hasErrors = false
    },
    getTournamentsFailure: state => {
      state.isLoading = false
      state.hasErrors = true
    },

    tournamentsResetState: state => {
      state.isLoading = false,
        state.hasErrors = false,
        state.tournamentsData = []
    }
  },
})

export default tournamentsSlice.reducer

// Action creators are generated for each case reducer function
export const { getTournaments, getTournamentsSuccess, getAddTournamentsSuccess, getTournamentsFailure, tournamentsResetState } = tournamentsSlice.actions