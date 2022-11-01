import { createSlice } from '@reduxjs/toolkit'
import { propsStateMessages } from '../interface'
import { fetchMessages, postMessage } from './apiManager'





const initialState: propsStateMessages = {

    status: "complete",
    messages: null,

}

export const apiSlice = createSlice({
    name: 'api',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.status = 'complete'
                state.messages = action.payload.data
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.status = 'failed'
            })

            .addCase(postMessage.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(postMessage.fulfilled, (state, action) => {
                state.status = 'complete'
                // state.messages = [...state.messages? state.messages : [] , action.payload.data]
            })
            .addCase(postMessage.rejected, (state, action) => {
                state.status = 'failed'
            })

    },

    

    reducers: {
    }
})

export const { } = apiSlice.actions

export default apiSlice.reducer