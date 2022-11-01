import { createSlice} from '@reduxjs/toolkit'
import { propsEvent } from '../components/interface'
import { eventsState } from '../components/interface'
  

const initialState: eventsState = {
    isLoading : false, 
    hasErrors :false, 
    eventsData : [], 
    eventsStillData : true,

}

const eventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    getEvents: state => {
      state.isLoading = true
    },
    getEventsSuccess: (state, {payload} : {payload : { data : propsEvent[], stillData : boolean}}) => {
      state.eventsData = payload.data
      state.isLoading = false
      state.hasErrors = false
      state.eventsStillData = payload.stillData
    },
    getAddEventsSuccess: (state, {payload} : {payload : { data : propsEvent[], stillData : boolean}}) => {
        state.eventsData = [...state.eventsData, ...payload.data]
        state.eventsStillData = payload.stillData
        state.isLoading = false
        state.hasErrors = false
      },
    getEventsFailure: state => {
      state.isLoading = false
      state.hasErrors = true
    },

    eventsResetState: state => {
        state.isLoading = false, 
        state.hasErrors = false, 
        state.eventsStillData = true
        state.eventsData = []
    }
  },
})

export default eventsSlice.reducer

// Action creators are generated for each case reducer function
export const { getEvents, getEventsSuccess, getAddEventsSuccess, getEventsFailure, eventsResetState } = eventsSlice.actions