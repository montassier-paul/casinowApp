import { SafeAreaView } from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, PokerMain } from '../components'

const Poker = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <FocusedStatusBar />
      <Header />
      <PokerMain />
    </SafeAreaView>
  )
}

export default Poker