import { createSlice } from '@reduxjs/toolkit'
import { casinosState, propsCasino } from '../components/interface'


const initialState: casinosState = {
  isLoading: false,
  hasErrors: false,
  casinosData: [],

}


const casinosSlice = createSlice({
  name: 'casinos',
  initialState: initialState,
  reducers: {
    getCasinos: state => {
      state.isLoading = true
    },
    getCasinosSuccess: (state, { payload }: { payload: propsCasino[] }) => {
      state.casinosData = payload
      state.isLoading = false
      state.hasErrors = false
    },
    getAddCasinosSuccess: (state, { payload }: { payload: propsCasino[] }) => {
      state.casinosData = [...state.casinosData, ...payload]
      state.isLoading = false
      state.hasErrors = false
    },
    getCasinosFailure: state => {
      state.isLoading = false
      state.hasErrors = true
    },

    casinosResetState: state => {
      state.isLoading = false,
        state.hasErrors = false,
        state.casinosData = []
    }
  },
})

export default casinosSlice.reducer

// Action creators are generated for each case reducer function
export const { getCasinos, getCasinosSuccess, getAddCasinosSuccess, getCasinosFailure, casinosResetState } = casinosSlice.actions