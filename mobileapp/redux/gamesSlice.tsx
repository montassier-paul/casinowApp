import { createSlice } from '@reduxjs/toolkit'
import { propsGame } from '../components/interface'
import { gamesState } from '../components/interface'



const initialState: gamesState = {
    isLoading: false,
    hasErrors: false,
    gamesData: [],
    machinesStillData : true, 
    tablesStillData : true, 
    machinesLength : 0, 
    tablesLength : 0

}

const gameSlice = createSlice({
    name: 'games',
    initialState: initialState,
    reducers: {

        getGames: state => {
            state.isLoading = true
        },
        getGamesSuccess: (state, {payload} : {payload : { data : propsGame[], stillData : boolean, context? : string}}) => {

            state.gamesData = payload.data
            state.isLoading = false
            state.hasErrors = false
            switch(payload.context){
                case "machines":
                    state.machinesStillData = payload.stillData
                    state.machinesLength  = payload.data.length
                    state.tablesLength = 0
                    break
                case "tables":
                    state.tablesStillData = payload.stillData
                    state.tablesLength = payload.data.length
                    state.machinesLength  = 0
                    break
                default : 
                    break
            }
        },

        getAddGamesSuccess: (state, {payload} : {payload : { data : propsGame[], stillData : boolean, context? : string}}) => {

            state.gamesData = [...state.gamesData, ...payload.data]
            state.isLoading = false
            state.hasErrors = false
            switch(payload.context){
                case "machines":
                    state.machinesStillData = payload.stillData
                    state.machinesLength  += payload.data.length
                    break
                case "tables":
                    state.tablesStillData = payload.stillData
                    state.tablesLength += payload.data.length
                    break
                default : 
                    break
            }
        },

        updateGames: (state, { payload } : {payload : {id : string, jackpot : number}}) => {

        state.gamesData.map((gameData) => {
                if (gameData._id === payload.id) {
                gameData.jackpot = payload.jackpot
                }  
            }),
        state.isLoading = false
        state.hasErrors = false
        
        },

        updateTables: (state, { payload } : {payload : {id : string, open : boolean}}) => {

            state.gamesData.map((gameData) => {
                if (gameData._id === payload.id) {
                gameData.open = payload.open
                }
            }),

            state.isLoading = false
            state.hasErrors = false
        },

        getGamesFailure: state => {
            state.isLoading = false
            state.hasErrors = true
        },

        gamesResetState: state => {
            state.gamesData = []
            state.isLoading = false
            state.hasErrors = false
            state.tablesStillData = true, 
            state.machinesStillData = true, 
            state.machinesLength = 0, 
            state.tablesLength = 0 

        },

    },
})

export default gameSlice.reducer

// Action creators are generated for each case reducer function
export const { getGames, getGamesSuccess, getGamesFailure, gamesResetState, updateTables, updateGames, getAddGamesSuccess} = gameSlice.actions