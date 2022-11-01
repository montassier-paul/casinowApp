import { View, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MachineCard, TableCard } from '../Cards'
import socketIOClient from "socket.io-client";
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchData } from '../../redux/api'
import { gamesResetState, updateGames, updateTables } from '../../redux/gamesSlice'
import { propsGame, ContextTypes } from '../interface';
import { FONT, VALUES } from '../../constants';




const DirectMain = () => {


  const step = VALUES.STEPLARGE;


  const games = useAppSelector((state: RootState) => state.games)
  const user = useAppSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  const [casinosIdList, setCasinosIdList] = useState<string[]>([])

  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let mHeight = event.nativeEvent.layoutMeasurement.height;
    let cSize = event.nativeEvent.contentSize.height;
    let Y = event.nativeEvent.contentOffset.y;

    if (Math.ceil(mHeight + Y) >= cSize - 20 && !games.isLoading) {


      if (games.machinesStillData) {


        await dispatch(fetchData({
          url: "machines/full/",
          params: { casinoData: 1, limit: step, offset: games.machinesLength, q_casinoId:casinosIdList},
          context: ContextTypes.games, 
          addData : true, 
          step : step
        }))

      }

      if (games.tablesStillData){

        await dispatch(fetchData( {
          url: "tables/full/",
          params: { casinoData: 1, limit: step, offset: games.tablesLength, q_casinoId:casinosIdList },
          context: ContextTypes.games, 
          addData : true, 
          step : step
        }))

      }
    }

  }

  useEffect(() => {


    const casinosId = user.followings.filter((following) => {
        return following.purpose === "jackpot"&& following.casinoId !== undefined
    }).map((following) => {return following.casinoId})


    setCasinosIdList(casinosId as string[])


    const init = async() => {

      await dispatch(fetchData( {
        url: "machines/full/",
        params: { casinoData: 1, limit: step, q_casinoId:casinosId as string[] },
        context: ContextTypes.games, 
        addData : false, 
        step : step
      }))
  
      await dispatch(fetchData({
        url: "tables/full/",
        params: { casinoData: 1, limit: step, q_casinoId:casinosId as string[]},
        context: ContextTypes.games, 
        addData : true, 
        step : step
      }))

    }

    init()
    

    const socket = socketIOClient(VALUES.ENDPOINT);
    socket.on("machine update", data => {

      dispatch(updateGames({id : data.id, jackpot : data.jackpot}))

    }
    );

    socket.on("table update", data => {

      dispatch(updateTables({id : data.id, open : data.open}))
    })


    return () => {
      socket.off()
      dispatch(gamesResetState())

    }

  }, []);


  return (
    <ScrollView
      onScroll={(event) => handleScroll(event)}
      style={{
        height: "100%",
      }}>

      <View style={{ height: 70 }} />


      {games.gamesData.map((gameData : propsGame, key : number) => {

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
          <Text style={{fontFamily:FONT.Text1}}>No more Games</Text>
        </View>}

        <View style={{height : 150}}/>








    </ScrollView>
  )
}

export default DirectMain