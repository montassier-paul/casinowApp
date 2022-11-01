
import userReducer from "./context/UserSlice"
import casinosReducer from "./context/CasinoSlice"
import messagesReducer from "./context/MessageSlice"
import websiteDataReducer from "./context/WebsiteSlice"
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const rootReducer = combineReducers({
  user : userReducer, 
  casinos : casinosReducer, 
  messages : messagesReducer, 
  webData : websiteDataReducer

});


const store = configureStore({
  reducer: rootReducer,
})


export default store;




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector