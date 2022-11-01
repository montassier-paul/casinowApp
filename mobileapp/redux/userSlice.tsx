import { createSlice } from '@reduxjs/toolkit'
import { userState } from '../components/interface'


const initialState: userState = {
    isLoading: false,
    hasErrors: false,
    firstName: "",
    familyName: "",
    numTel: "",
    smsBool: false,
    followings: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: state => {

            state.isLoading = true
        },
        getUserFaillure: state => {

            state.isLoading = false
            state.hasErrors = true

        },
        updateUserInfo: (state, { payload }: { payload: { firstName: string, familyName: string, numTel: string } }) => {

            if (payload.firstName !== state.firstName) {
                state.firstName = payload.firstName
            }
            if (payload.familyName !== state.familyName) {
                state.familyName = payload.familyName
            }
            if (payload.numTel !== state.numTel) {
                state.numTel = payload.numTel
            }

            state.isLoading = false

        },

        addFollowings: (state, { payload }: { payload: { casinoId?: string, casinoName?: string, casinoAdresse?: string, purpose?: "jackpot" | "events" | "tournaments" } }) => {

            state.followings.push({ casinoId: payload.casinoId, casinoName: payload.casinoName, casinoAdresse: payload.casinoAdresse, purpose: payload.purpose })
            state.isLoading = false
        },

        removeFollowings: (state, { payload }: { payload: { casinoId?: string, purpose?: "jackpot" | "events" | "tournaments" } }) => {

            state.followings = state.followings.filter((follow) =>
                follow.casinoId !== payload.casinoId || follow.purpose !== payload.purpose)
            state.isLoading = false
        },
        resetfirstName: (state) => {
            state.firstName = ""

        },
        resetfamilyName: (state) => {
            state.familyName = ""

        },
        resetTelNumber: (state) => {
            state.numTel = ""

        },
        resetSmsBool: (state) => {
            state.smsBool = false

        },
        updateSmsBool: (state) => {
            state.smsBool = !state.smsBool

        },
        endLoading: (state) => {
            state.isLoading = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { getUser, getUserFaillure, endLoading, updateSmsBool, updateUserInfo, resetSmsBool, resetTelNumber, resetfamilyName, resetfirstName, removeFollowings, addFollowings } = userSlice.actions

export default userSlice.reducer