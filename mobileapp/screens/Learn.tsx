import { SafeAreaView } from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, LearnMain } from '../components'

const Learn = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <FocusedStatusBar />
      <Header />
      <LearnMain />
    </SafeAreaView>
  )
}

export default Learn