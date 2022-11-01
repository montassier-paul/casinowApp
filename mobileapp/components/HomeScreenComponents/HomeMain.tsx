import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { HomeMenuCard } from '../Cards'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { ContextTypes } from '../interface'
import { fetchData } from '../../redux/api'

const HomeMain = () => {


  const SearchData = useAppSelector((state: RootState) => state.research)
  const dispatch = useAppDispatch()


  useEffect(() => {

    const init = async () => {

      if (SearchData.CasinosSearchData.names.length === 0) {

        await dispatch(fetchData({
          url: "research/casinos",
          context: ContextTypes.researchBar
        }))


        await dispatch(fetchData({
          url: "research/games",
          context: ContextTypes.researchBar
        }))

      }
    }


    init()


  }, [])


  return (
    <View>

      <View style={{ height: 70 }}>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}>

        {/* Direct */}
        <HomeMenuCard
          data={{
            img: require("../../images/DirectCover.jpg"),
            title: "Direct",
            bottom: 20,
            navigationPage: "Direct"
          }} />

        {/* Casino & Clubs */}
        <HomeMenuCard
          data={{
            img: require("../../images/CasinosClubsCover.jpg"),
            title: "Casinos & Clubs",
            right: 50,
            bottom: 20,
            navigationPage: "Casinos"
          }} />

        {/* GameCard */}
        <HomeMenuCard
          data={{
            img: require("../../images/GamesCover.jpg"),
            title: "Jeux",
            right: 50,
            bottom: 100,
            navigationPage: "Games"
          }} />

        {/* PokerCard */}
        <HomeMenuCard
          data={{
            img: require("../../images/PokerCover.jpg"),
            title: "Tournois",
            right: 180,
            bottom: 80,
            navigationPage: "Poker"
          }} />

        {/* EventsCard */}
        <HomeMenuCard
          data={{
            img: require("../../images/EventsCover.jpg"),
            title: "Evenements",
            navigationPage: "Events"
          }} />

        {/* Learn2Play */}
        <HomeMenuCard
          data={{
            img: require("../../images/LearnCover.jpg"),
            title: "Apprendre",
            bottom: 10,
            navigationPage: "Learn"
          }} />

        {/* User */}
        <HomeMenuCard
          data={{
            img: require("../../images/UserCover.jpg"),
            title: "User",
            bottom: 100,
            right: 20,
            navigationPage: "User"
          }} />

        {/* Settings */}
        <HomeMenuCard
          data={{
            img: require("../../images/SettingsCover.jpg"),
            title: "Settings",
            bottom: 20,
            navigationPage: "Settings"
          }} />
      
      <View style={{height:150}}/>
      </ScrollView>
    </View>
  )
}

export default HomeMain