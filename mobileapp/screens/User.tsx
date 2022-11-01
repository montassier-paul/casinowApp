import { SafeAreaView, View } from 'react-native'
import React from 'react'
import { UserMain, FocusedStatusBar, Header } from '../components'

const User = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <FocusedStatusBar />
      <Header />
      <View style={{ height: 70 }}>
      </View>
      <UserMain />
    </SafeAreaView>
  )
}

export default User