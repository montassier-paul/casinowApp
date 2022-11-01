import { View, ScrollView, Text, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native'
import { Search } from '../Search'
import React, { useState, useEffect } from 'react'
import { propsCasino, propsGame, ContextTypes } from '../interface'
import axios from 'axios'
import { MachineCard, TableCard } from '../Cards'
import socketIOClient from "socket.io-client";
import { COLORS, FONT, VALUES } from '../../constants'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchData } from '../../redux/api'
import { gamesResetState, updateGames, updateTables } from '../../redux/gamesSlice'




const GamesMain = () => {


  const step = VALUES.STEPLARGE;
  const [queryCasino, setQueryCasino] = useState("")
  const [queryGame, setQueryGame] = useState("")
  const [autocompleteDataCasinos, setAutocompleteDataCasinos] = useState<string[]>([])
  const [filteredAutocompleteDataCasinos, setFilteredAutocompleteDataCasinos] = useState<string[]>([])
  const [autocompleteDataGames, setAutocompleteDataGames] = useState<string[]>([])
  const [filteredAutocompleteDataGames, setFilteredAutocompleteDataGames] = useState<string[]>([])
  const [casinosIdList, setCasinosIdList] = useState<string[]>([])

  const games = useAppSelector((state: RootState) => state.games)
  const searchData = useAppSelector((state: RootState) => state.research)
  const dispatch = useAppDispatch()


  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;

    if (Math.ceil(mHeight + Y) >= cSize - 20 && !games.isLoading && !searchData.isLoading) {

      if (games.machinesStillData) {


        const paramsGames = {
          url: "machines/full/",
          params: {
            casinoData: 1, limit: step, offset: games.machinesLength, q_game: queryGame.length ? queryGame : undefined,
            q_casinoId: casinosIdList.length ? casinosIdList : undefined
          },
          context: ContextTypes.games,
          addData: true,
          step: step,

        }
        dispatch(fetchData(paramsGames))

      }

      if (games.tablesStillData) {

        const paramsGames = {
          url: "tables/full/",
          params: {
            casinoData: 1, limit: step, offset: games.tablesLength, q_game: queryGame.length ? queryGame : undefined,
            q_casinoId: casinosIdList.length ? casinosIdList : undefined
          },
          context: ContextTypes.games,
          addData: true,
          step: step,

        }
        dispatch(fetchData(paramsGames))

      }

    }

  }


  useEffect(() => {

    const init = async () => {

      await dispatch(fetchData({
        url: "machines/full/",
        params: { casinoData: 1, limit: step },
        context: ContextTypes.games,
        addData: false,
        step: step
      }))

      await dispatch(fetchData({
        url: "tables/full/",
        params: { casinoData: 1, limit: step },
        context: ContextTypes.games,
        addData: true,
        step: step
      }))

      setAutocompleteDataCasinos([...searchData.CasinosSearchData.names,
      ...searchData.CasinosSearchData.adresses,
      ...searchData.CasinosSearchData.departements,
      ...searchData.CasinosSearchData.groupes,
      ...searchData.CasinosSearchData.regions,
      ...searchData.CasinosSearchData.villes])
      setFilteredAutocompleteDataCasinos([...searchData.CasinosSearchData.names,
      ...searchData.CasinosSearchData.adresses,
      ...searchData.CasinosSearchData.departements,
      ...searchData.CasinosSearchData.groupes,
      ...searchData.CasinosSearchData.regions,
      ...searchData.CasinosSearchData.villes])

      setAutocompleteDataGames([...searchData.GamesSearchData.tables,
      ...searchData.GamesSearchData.games])
      setFilteredAutocompleteDataGames([...searchData.GamesSearchData.tables,
      ...searchData.GamesSearchData.games])


    }

    init()

    const socket = socketIOClient(VALUES.ENDPOINT);
    socket.on("machine update", data => {

      dispatch(updateGames({ id: data.id, jackpot: data.jackpot }))

    }
    );


    socket.on("table update", data => {

      dispatch(updateTables({ id: data.id, open: data.open }))
    })

    return () => {
      socket.off()
      dispatch(gamesResetState())

    }

  }, []);



  const handleSearchOnPress = async () => {


    try {


      if (!searchData.CasinosSearchData.names.includes(queryCasino) && !searchData.CasinosSearchData.adresses.includes(queryCasino) && !searchData.CasinosSearchData.groupes.includes(queryCasino) && !searchData.CasinosSearchData.departements.includes(queryCasino) &&
        !searchData.CasinosSearchData.regions.includes(queryCasino) && !searchData.CasinosSearchData.villes.includes(queryCasino) && queryCasino.length) {


        dispatch(gamesResetState())


      }

      else if (!searchData.GamesSearchData.games.includes(queryGame) && !searchData.GamesSearchData.tables.includes(queryGame) && queryGame.length) {

        dispatch(gamesResetState())

      }

      else {



        const paramsCasinos = {
          ...(searchData.CasinosSearchData.names.includes(queryCasino)) ? { q_name: queryCasino } : null,
          ...(searchData.CasinosSearchData.adresses.includes(queryCasino)) ? { q_adresse: queryCasino } : null,
          ...(searchData.CasinosSearchData.villes.includes(queryCasino)) ? { q_ville: queryCasino } : null,
          ...(searchData.CasinosSearchData.regions.includes(queryCasino)) ? { q_region: queryCasino } : null,
          ...(searchData.CasinosSearchData.groupes.includes(queryCasino)) ? { q_groupe: queryCasino } : null,
          ...(searchData.CasinosSearchData.departements.includes(queryCasino)) ? { q_departement: queryCasino } : null,
        }


        const casinos = await axios.get('https://casinow.herokuapp.com/api/casinos/full/', { params: paramsCasinos });
        const casinosId = casinos.data.data.map((casino: propsCasino) => {
          return casino._id
        })

        setCasinosIdList(casinosId)



        if (searchData.GamesSearchData.games.includes(queryGame)) {

          const paramsGames = {
            url: "machines/full/",
            params: { casinoData: 1, limit: step, q_game: queryGame, q_casinoId: casinosId },
            context: ContextTypes.games, step: step
          }
          await dispatch(fetchData(paramsGames))

        }
        if (searchData.GamesSearchData.tables.includes(queryGame)) {

          const paramsGames = {
            url: "tables/full/",
            params: { casinoData: 1, limit: step, q_game: queryGame, q_casinoId: casinosId },
            context: ContextTypes.games, step: step
          }
          await dispatch(fetchData(paramsGames))


        }
        if (queryGame.length === 0) {

          await dispatch(fetchData({
            url: "machines/full/",
            params: { casinoData: 1, limit: step, q_casinoId: casinosId, },
            context: ContextTypes.games, addData: false, step: step
          }))


          await dispatch(fetchData({
            url: "tables/full/",
            params: { casinoData: 1, limit: step, q_casinoId: casinosId },
            context: ContextTypes.games, addData: true, step: step
          }))


        }

      }

    }
    catch (error) {

    }

  }

  const handleSearch = (value: string, context?: string) => {


    switch (context) {
      case 'place':
        {
          setQueryCasino(value)
          const filteredSuggestions = autocompleteDataCasinos.filter(
            suggestion =>
              suggestion.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredAutocompleteDataCasinos(filteredSuggestions)
          break
        }


      case "service":
        {
          setQueryGame(value)

          const filteredSuggestions = autocompleteDataGames.filter(
            suggestion =>
              suggestion.toLowerCase().includes(value.toLowerCase())
          );

          setFilteredAutocompleteDataGames(filteredSuggestions)
          break
        }

      default:
        break


    }
  }


  return (


    <ScrollView

      onScroll={(event) => handleScroll(event)}

      style={{
        height: "100%",
        padding: 10,
      }}>

      <View style={{ height: 70 }} />



      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          marginBottom: 5,
          zIndex: 1
        }}>

        <Search data={{ text: "Search for a casino or a place", context: "place", suggestionData: filteredAutocompleteDataCasinos }} handleSearch={handleSearch} />
        <View />
        <Search data={{ text: "Search for a Game or a service", context: "service", suggestionData: filteredAutocompleteDataGames }} handleSearch={handleSearch} />

        <TouchableOpacity
          onPress={handleSearchOnPress}
          style={{ backgroundColor: COLORS.DarkPurple, alignSelf: "flex-end", borderRadius: 10, width: 80, paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ textAlign: "center", fontFamily: FONT.Text1 }}>Search</Text>
        </TouchableOpacity>
      </View>



      {games.gamesData.map((gameData: propsGame, key: number) => {

        if (gameData.jackpot) {
          return <MachineCard data={{
            jackpot: gameData.jackpot, casinoId: gameData.casinoId, _id: gameData._id,
            game: gameData.game, CasinoName: gameData.CasinoName, CasinoAdresse: gameData.CasinoAdresse
          }} key={key} />
        }
        if (gameData.open !== undefined) {

          return <TableCard data={{
            open: gameData.open, casinoId: gameData.casinoId, game: gameData.game,
            _id: gameData._id, CasinoName: gameData.CasinoName, CasinoAdresse: gameData.CasinoAdresse
          }} key={key} />

        }
      })
      }

      {!games.machinesStillData && !games.tablesStillData &&
        <View style={{ height: 50, alignItems: "center" }}>
          <Text style={{ fontFamily: FONT.Text1 }}>No more Games</Text>
        </View>}

      <View style={{ height: 150 }} />

    </ScrollView>

  )
}

export default GamesMain