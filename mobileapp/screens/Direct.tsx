import { SafeAreaView} from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, DirectMain } from '../components'

const Direct = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#FFFF" }}>
      <FocusedStatusBar/>
      <Header/>
      <DirectMain/>

    </SafeAreaView>
  )
}

export default Direct