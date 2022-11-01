import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { GamesData } from '../../constants'
import GameCard from './GameCard'
import LearnHeader from './LearnHeader'
import RuleCard from './RuleCard'

const LearnMain = () => {

  const [data, setData] = useState({
    type: " ",
    jeu: " ",
    description: " ",
    img: " ",
    id: 0

  })
  const [displayRules, setDisplayRules] = useState(false)



  return (
    <View style={{
      height: "100%"
    }}>

      <View style={{ height: 70 }}>
      </View>

      {!displayRules
        ?
        <FlatList
          data={GamesData}
          renderItem={({ item }) => <GameCard data={item} setDisplayRules={setDisplayRules}
            setData={setData} />}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<LearnHeader />}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
        : <RuleCard data={data} setDisplayRules={setDisplayRules}
          setData={setData} />
      }




    </View>
  )
}

export default LearnMain