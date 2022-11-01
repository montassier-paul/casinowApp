import { View, TouchableOpacity, Text, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { propsCasino, propsEvent, ContextTypes } from '../interface';
import { Search } from '../Search';
import { EventCard } from '../Cards';
import { COLORS, FONT, VALUES } from '../../constants';
import Picker from '../Picker';
import type { RootState, } from '../../redux/store'
import { fetchData } from '../../redux/api';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { eventsResetState } from '../../redux/eventsSlice';

const EventMain = () => {


  const dates = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]

  const step = VALUES.STEPSMALL;

  const [date, setDate] = useState('Unknown')
  const [query, setQuery] = useState("")
  const [autocompleteData, setAutocompleteData] = useState<string[]>([])
  const [filteredAutocompleteData, setFilteredAutocompleteData] = useState<string[]>([])
  const [casinosIdList, setCasinosIdList] = useState<string[]>([])

  const events = useAppSelector((state: RootState) => state.events)
  const SearchData = useAppSelector((state: RootState) => state.research)
  const dispatch = useAppDispatch()


  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;
    if (Math.ceil(mHeight + Y) >= cSize - 20 && !events.isLoading && !SearchData.isLoading) {


      if (events.eventsStillData) {

        await dispatch(fetchData({
          url: "evenements/full/",
          params: {
            casinoData: 1, q_month: date !== "Unknown" ? date : undefined,
            q_casinoId: casinosIdList.length ? casinosIdList : undefined, limit: step,
            offset: events.eventsData.length
          },
          addData: true,
          context: ContextTypes.events,
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

        dispatch(eventsResetState())

      }

      else {

        const paramsCasinos = {
          ...(SearchData.CasinosSearchData.names.includes(query)) ? { q_name: query } : null,
          ...(SearchData.CasinosSearchData.adresses.includes(query)) ? { q_adresse: query } : null,
          ...(SearchData.CasinosSearchData.villes.includes(query)) ? { q_ville: query } : null,
          ...(SearchData.CasinosSearchData.regions.includes(query)) ? { q_region: query } : null,
          ...(SearchData.CasinosSearchData.groupes.includes(query)) ? { q_groupe: query } : null,
          ...(SearchData.CasinosSearchData.departements.includes(query)) ? { q_departement: query } : null,
        }

        const casinos = await axios.get('https://casinow.herokuapp.com/api/casinos/full/', { params: paramsCasinos });
        const casinosId = casinos.data.data.map((casino: propsCasino) => {
          return casino._id
        })

        setCasinosIdList(casinosId)

        await dispatch(fetchData({
          url: "evenements/full/",
          params: { casinoData: 1, q_month: date !== "Unknown" ? date : undefined, q_casinoId: casinosId, limit: step },
          addData: false,
          step: step,
          context: ContextTypes.events
        }))
      }
    }

    catch (error) {

    }

  }


  useEffect(() => {

    const init = async () => {

      await dispatch(fetchData({
        url: "evenements/full/",
        params: { casinoData: 1, limit: step },
        addData: false,
        context: ContextTypes.events,
        step: step,
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
      dispatch(eventsResetState())

    }


  }, []);


  return (
    <ScrollView
      onScroll={(event) => handleScroll(event)}
      style={{ padding: 10, flex: 1 }}>
      <View style={{ height: 70 }} />

      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          marginBottom: 5,
          zIndex: 1
        }}>
        <Search data={{ text: "Search for a casino or a place", context: "", suggestionData: filteredAutocompleteData }} handleSearch={handleSearch} />


        <Picker data={{ date: date, dates: dates }} setDate={setDate} />

        <TouchableOpacity
          onPress={handleSearchOnPress}
          style={{ backgroundColor: COLORS.DarkPurple, alignSelf: "flex-end", borderRadius: 10, width: 80, paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ textAlign: "center" , fontFamily : FONT.Text1}}>Search</Text>
        </TouchableOpacity>

      </View>

      {events.eventsData.map((data: propsEvent, key: number) => {
        return <EventCard data={data} key={key} />

      })}

      {!events.eventsStillData &&
        <View style={{ height: 50, alignItems: "center" }}>
          <Text style={{fontFamily : FONT.Text1}}>No more Evens</Text>
        </View>}

      <View style={{ height: 150 }} />



    </ScrollView>
  )
}

export default EventMain
