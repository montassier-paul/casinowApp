import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import eventsReducer from './eventsSlice'
import researchReducer from "./searchSlice"
import tournamentsReducer from "./tournamentsSlice"
import casinosReducer from './casinosSlice'
import gamesReducer from './gamesSlice'
import userReducer from "./userSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


const persistConfig = {
  key: 'userData',
  version: 1,
  storage: AsyncStorage,
  whiteList: ['firstname', "familyName", "telNumber", "smsBool", "followings"]
};


const rootReducer = combineReducers({
  user : persistReducer(persistConfig, userReducer),
  events: eventsReducer,
  research: researchReducer,
  tournaments: tournamentsReducer,
  casinos: casinosReducer,
  games: gamesReducer,
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export default store;




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


