import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const fetchCasinos = createAsyncThunk('casinos/fetchCasinos', async () => {
  const response = await axios.get( process.env.REACT_APP_URL + 'casinos/full/')
  return response.data
})


export const fetchMessages = createAsyncThunk('casinos/fetchMessages', async (action : {payload : {casinoId : string}}) => {
  const response = await axios.get( process.env.REACT_APP_URL + 'messages/full/?q_casinoId=' + action.payload.casinoId)
  return response.data
})


export const postMessage = createAsyncThunk('casinos/postMessage', async (action : {payload : {casinoId : string, nom : string, prenom : string, email : string, message : string}}) => {

  const response = await axios.post( process.env.REACT_APP_URL + 'messages/message',
   {casinoId : action.payload.casinoId,
     nom : action.payload.prenom + " " +  action.payload.nom, 
    email : action.payload.email, 
    message :action.payload.message})
  return response.data
})


export const putVote = createAsyncThunk('casinos/putVote', async (action : {payload : {casinoId : string, vote : number}}) => {

  console.log(action.payload.vote)
  console.log(process.env.REACT_APP_URL + 'casinos/vote/' + action.payload.casinoId)

  const response = await axios.put( process.env.REACT_APP_URL + 'casinos/vote/' + action.payload.casinoId,
   {
    score : action.payload.vote, 
})
  return {data : response.data, id : action.payload.casinoId}
})

export const fetchWebsiteData = createAsyncThunk('casinos/fetchWebsiteData', async () => {
  const response = await axios.get( process.env.REACT_APP_URL + 'websiteData/')
  return response.data
})

