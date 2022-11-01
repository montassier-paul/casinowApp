import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { SettingsMain } from '../components'

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsMain />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings