import { SafeAreaView } from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, CasinosMain } from '../components'

const Casinos = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <FocusedStatusBar />
      <Header />
      <CasinosMain />
    </SafeAreaView>
  )
}

export default Casinos