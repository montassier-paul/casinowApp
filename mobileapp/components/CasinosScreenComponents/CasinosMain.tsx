import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CasinoScreen from './CasinoScreen'
import { CasinoCard } from '../Cards'
import { Search } from '../Search'
import { propsCasino, ContextTypes } from '../interface'
import { fetchData } from '../../redux/api'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { eventsResetState } from '../../redux/eventsSlice'
import { tournamentsResetState } from '../../redux/tournamentsSlice'
import { gamesResetState } from '../../redux/gamesSlice'
import { casinosResetState } from '../../redux/casinosSlice'



const CasinosMain = () => {
  const [casino, setCasino] = useState<propsCasino>()
  const [casinosDataFiltered, setCasinosDataFiltered] = useState<propsCasino[]>([])
  const [serviceSearch, setServiceSearch] = useState('')
  const [placeSearch, setPlaceSearch] = useState('')
  const [displayCasino, setDisplayCasino] = useState(false)
  const casinos = useAppSelector((state: RootState) => state.casinos)
  const dispatch = useAppDispatch()



  useEffect(() => {

    const paramsEvents = {
      url: "casinos/full/",
      params: {},
      scrollRequest: false,
      context: ContextTypes.casinos
    }
    dispatch(fetchData(paramsEvents))

    return () => {
      dispatch(eventsResetState())
      dispatch(tournamentsResetState())
      dispatch(gamesResetState())
      dispatch(casinosResetState())
    }



  }, []);

  const handleClick = (id?: string) => {



    if (id) {
      const data = casinos.casinosData.filter((casinoData) => casinoData._id === id)
      data.length === 1 && setCasino(data[0])
    }
    else {
      setCasino(undefined)
    }


    setDisplayCasino(prev => !prev)

  }
  useEffect(() => {
    setCasinosDataFiltered(casinos.casinosData)
  }, [casinos.casinosData])

  const handleSearch = (value: string, context?: string) => {

    if (context === "service") {
      setServiceSearch(value)

      if (value.length === 0 && placeSearch.length === 0) {
        setCasinosDataFiltered(casinos.casinosData)
      }
      else {
        let filteredData = casinos.casinosData.filter((casinoData) =>
          (
            casinoData.adresse.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.departement?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.name.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.region?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase()) ||
            casinoData.ville?.toLocaleLowerCase().includes(placeSearch.toLocaleLowerCase())
          ) &&
          (
            "poker".includes(value.toLocaleLowerCase()) && casinoData.poker ||
            "restaurant".includes(value.toLocaleLowerCase()) && casinoData.restaurant ||
            "parking".includes(value.toLocaleLowerCase()) && casinoData.parking ||
            "hôtel".includes(value.toLocaleLowerCase()) && casinoData.hotel ||
            "hotel".includes(value.toLocaleLowerCase()) && casinoData.hotel ||
            "paris sportif".includes(value.toLocaleLowerCase()) && casinoData.betting ||

            (casinoData.games.length > 0 ?

              casinoData.games.filter((game) => {

                if (game.game.toLocaleLowerCase().includes(serviceSearch.toLocaleLowerCase()) &&
                  game.numbers > 0) {
                  return true
                }
                else {
                  return false
                }
              }).length > 0
              : false)

          )

        )

        if (filteredData.length === 0) {
          setCasinosDataFiltered([])
        } else {
          setCasinosDataFiltered(filteredData)
        }


      }

    }
    if (context === "place") {

      setPlaceSearch(value)

      if (value.length === 0 && serviceSearch.length === 0) {
        setCasinosDataFiltered(casinos.casinosData)
      }
      else {

        let filteredData = casinos.casinosData.filter((casinoData) =>

          (
            casinoData.adresse.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.departement?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.region?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            casinoData.ville?.toLocaleLowerCase().includes(value.toLocaleLowerCase())

          )

          &&

          (serviceSearch.length > 0
            ?
            "poker".includes(serviceSearch.toLocaleLowerCase()) && casinoData.poker ||
            "restaurant".includes(serviceSearch.toLocaleLowerCase()) && casinoData.restaurant ||
            "parking".includes(serviceSearch.toLocaleLowerCase()) && casinoData.parking ||
            "hôtel".includes(serviceSearch.toLocaleLowerCase()) && casinoData.hotel ||
            "hotel".includes(serviceSearch.toLocaleLowerCase()) && casinoData.hotel ||
            "paris sportif".includes(serviceSearch.toLocaleLowerCase()) && casinoData.betting ||

            (casinoData.games.length > 0 ?

              casinoData.games.filter((game) => {

                if (game.game.toLocaleLowerCase().includes(serviceSearch.toLocaleLowerCase()) &&
                  game.numbers > 0) {
                  return true
                }
                else {
                  return false
                }
              }).length > 0
              : false)

            : true
          )

        )

        if (filteredData.length === 0) {
          setCasinosDataFiltered([])
        } else {
          setCasinosDataFiltered(filteredData)
        }


      }
    }

  }


  return (
    <View style={{
      height: "100%"
    }}>

      <View style={{ height: 70 }}>
      </View>


      {!displayCasino
        ? <FlatList
          data={casinosDataFiltered}
          renderItem={({ item }) => <CasinoCard data={item} handleClickCard={handleClick} />}
          keyExtractor={(item: propsCasino) => item._id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 5,
              }}>
              <Search data={{ text: "Search for a casino or a place", context: "place" }} handleSearch={handleSearch} />
              <View />
              <Search data={{ text: "Search for a Game or a service", context: "service" }} handleSearch={handleSearch} />

            </View>
          }
          ListFooterComponent={<View style={{ height: 200 }} />}
        />

        : <CasinoScreen data={casino} handleQuit={handleClick} />

      }
    </View>
  )
}

export default CasinosMain