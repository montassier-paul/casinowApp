import { SafeAreaView} from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, GamesMain } from '../components'

const Games = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#FFFF" }}>
      <FocusedStatusBar/>
      <Header/>
      <GamesMain/>

    </SafeAreaView>
  )
}

export default Games