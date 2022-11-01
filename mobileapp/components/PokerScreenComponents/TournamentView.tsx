import { View, TouchableOpacity, Text, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CircleButton } from '../Button'
import { Search } from '../Search'
import axios from 'axios'
import { propsCasino, propsTournament, ContextTypes, propsTournamentView } from '../interface'
import { TournamentCard } from '../Cards'
import { COLORS, FONT, VALUES } from '../../constants';
import Picker from '../Picker';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchData } from '../../redux/api'
import { tournamentsResetState } from '../../redux/tournamentsSlice'





const TournamentView = ({ handleQuitClick, data }: propsTournamentView) => {

  const dates = {
    regular: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    exceptionnel: ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"]
  }

  const step = VALUES.STEPSMALL;


  const [date, setDate] = useState('Unknown')
  const [query, setQuery] = useState("")
  const [autocompleteData, setAutocompleteData] = useState<string[]>([])
  const [filteredAutocompleteData, setFilteredAutocompleteData] = useState<string[]>([])


  const tournaments = useAppSelector((state: RootState) => state.tournaments)
  const SearchData = useAppSelector((state: RootState) => state.research)
  const dispatch = useAppDispatch()
  const [casinosIdList, setCasinosIdList] = useState<string[]>([])


  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize - 20 && !tournaments.isLoading && !SearchData.isLoading) {


      if (tournaments.tournamentsData.length % step === 0) {



        await dispatch(fetchData({
          url: "tournaments/full/",
          params: {
            casinoData: 1, q_filterDate: date !== "Unknown" ? date : undefined,
            q_casinoId: casinosIdList, limit: step,
            q_type: data.tournamentStyle,
            offset: tournaments.tournamentsData.length
          },
          addData: true,
          context: ContextTypes.tournaments,
          step: step
        }))
      }

    }

  }

  const handleSearch = (value: string) => {

    setQuery(value)

    const filteredSuggestions = autocompleteData.filter(
      suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredAutocompleteData(filteredSuggestions)
  };


  const handleSearchOnPress = async () => {

    try {

      if (!SearchData.CasinosSearchData.names.includes(query) && !SearchData.CasinosSearchData.adresses.includes(query) && !SearchData.CasinosSearchData.groupes.includes(query) && !SearchData.CasinosSearchData.departements.includes(query) &&
        !SearchData.CasinosSearchData.regions.includes(query) && !SearchData.CasinosSearchData.villes.includes(query) && query.length) {

        dispatch(tournamentsResetState())

      }

      else {

        const paramsCasinos = {
          ...(SearchData.CasinosSearchData?.names.includes(query)) ? { q_name: query } : null,
          ...(SearchData.CasinosSearchData?.adresses.includes(query)) ? { q_adresse: query } : null,
          ...(SearchData.CasinosSearchData?.villes.includes(query)) ? { q_ville: query } : null,
          ...(SearchData.CasinosSearchData?.regions.includes(query)) ? { q_region: query } : null,
          ...(SearchData.CasinosSearchData?.groupes.includes(query)) ? { q_groupe: query } : null,
          ...(SearchData.CasinosSearchData?.departements.includes(query)) ? { q_departement: query } : null,
        }

        const casinos = await axios.get('https://casinow.herokuapp.com/api/casinos/full/', { params: paramsCasinos });
        const casinosId = casinos.data.data.map((casino: propsCasino) => {
          return casino._id
        })

        setCasinosIdList(casinosId)

        await dispatch(fetchData({
          url: "tournaments/full/",
          params: { casinoData: 1, q_filterDate: date !== "Unknown" ? date : undefined, q_casinoId: casinosId, limit: step, q_type: data.tournamentStyle },
          addData: false,
          context: ContextTypes.tournaments,
          step: step,
        }))

      }

    }
    catch (error) {

    }

  }


  useEffect(() => {

    const init = async () => {

      await dispatch(fetchData({
        url: "tournaments/full/",
        params: { casinoData: 1, limit: step, q_type: data.tournamentStyle },
        addData: false,
        context: ContextTypes.tournaments,
        step: step
      }))

      setAutocompleteData([...SearchData.CasinosSearchData.names,
      ...SearchData.CasinosSearchData.adresses,
      ...SearchData.CasinosSearchData.departements,
      ...SearchData.CasinosSearchData.groupes,
      ...SearchData.CasinosSearchData.regions,
      ...SearchData.CasinosSearchData.villes])
      setFilteredAutocompleteData([...SearchData.CasinosSearchData.names,
      ...SearchData.CasinosSearchData.adresses,
      ...SearchData.CasinosSearchData.departements,
      ...SearchData.CasinosSearchData.groupes,
      ...SearchData.CasinosSearchData.regions,
      ...SearchData.CasinosSearchData.villes])

    }

    init()

    return () => {
      dispatch(tournamentsResetState())

    }

  }, []);


  return (

    <View>

      <ScrollView style={{ padding: 10, height: "90%" }}
        onScroll={(event) => handleScroll(event)}>

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            marginBottom: 5,
          }}>

          <Search data={{ text: "Search for a casino or a place", context: "", suggestionData: filteredAutocompleteData }} handleSearch={handleSearch} />


          {
            data.tournamentStyle === "regular"
              ? <Picker data={{ date: date, dates: dates.regular }} setDate={setDate} />

              : <Picker data={{ date: date, dates: dates.exceptionnel }} setDate={setDate} />


          }

          <TouchableOpacity
            onPress={handleSearchOnPress}
            style={{ backgroundColor: COLORS.DarkPurple, alignSelf: "flex-end", borderRadius: 10, width: 80, paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: "center", fontFamily:FONT.Text1 }}>Search</Text>
          </TouchableOpacity>

        </View>

        {tournaments.tournamentsData.map((data: propsTournament, key: number) => {
          return <TournamentCard data={data} key={key} />

        })}


        {!tournaments.tournamentsStillData &&
          <View style={{ height: 50, alignItems: "center"}}>
            <Text style={{ fontFamily:FONT.Text1}}>No more Tournaments</Text>
          </View>}

        <View style={{ height: 150 }} />


      </ScrollView>
      <CircleButton handlePress={handleQuitClick} data={{ img: require("../../images/goBack.png") }} />
    </View>

  )
}

export default TournamentView