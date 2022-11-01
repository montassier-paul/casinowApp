import { SafeAreaView} from 'react-native'
import React from 'react'
import { FocusedStatusBar, Header, EventMain} from '../components'

const Events = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"#FFFF" }}>
      <FocusedStatusBar/>
      <Header/>
      <EventMain/>

    </SafeAreaView>
  )
}

export default Events