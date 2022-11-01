import { SafeAreaView } from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, HomeMain } from '../components';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FocusedStatusBar />
      <Header />
      <HomeMain/>
    </SafeAreaView>
  )
}




export default Home