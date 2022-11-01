import { createSlice} from '@reduxjs/toolkit'
import { propsCasinoRequestAutocompleteSearchBar, propsGameRequestAutocompleteSearchBar } from '../components/interface'
import { SearchState } from '../components/interface'
  

// store data used by reasearch bar

const initialState: SearchState = {
    isLoading : false, 
    hasErrors :false, 
    CasinosSearchData : {names : [], adresses : [], regions : [], groupes : [], departements : [], villes : []} , 
    GamesSearchData : {games : [], tables : []}, 
    test : "init"
}


const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    getSearch: state => {
      state.isLoading = true 
    },
    getSearchCasinosSuccess: (state, { payload } :{ payload : propsCasinoRequestAutocompleteSearchBar }) => {
      
      state.isLoading = false
      state.hasErrors = false
      state.test += "casinos"   
      state.CasinosSearchData = {...state.CasinosSearchData, 
                                 names : payload.names, 
                                 adresses : payload.adresses, 
                                 regions : payload.regions, 
                                 groupes : payload.groupes, 
                                 departements : payload.departements,
                                 villes :  payload.villes }

      
                          
      
    },

    getSearchGamesSuccess: (state, { payload } : { payload :  propsGameRequestAutocompleteSearchBar}) => {


      state.GamesSearchData = {...state.GamesSearchData, 
                                games : payload.games, 
                                tables : payload.tables}

      state.isLoading = false
      state.hasErrors = false
      state.test += "games"
    },
    getSearchFailure: state => {
      state.isLoading = false
      state.hasErrors = true
    },
    
    searchResetState: state => {
        state.CasinosSearchData = {...state.CasinosSearchData,
            names : [], adresses : [], regions : [], groupes : [], departements : [], villes : []}
        state.GamesSearchData = {...state.GamesSearchData, 
            games : [], tables : []}
        state.isLoading = false
        state.hasErrors = false 
        state.test = ""
        
    },

  },
})

export default searchSlice.reducer

// Action creators are generated for each case reducer function
export const { getSearch, getSearchCasinosSuccess, getSearchGamesSuccess, getSearchFailure, searchResetState} = searchSlice.actions