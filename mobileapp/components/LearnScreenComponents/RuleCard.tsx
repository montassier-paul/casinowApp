import { View, Text } from 'react-native'
import React from 'react'
import { CircleButton } from '../Button'

const RuleCard = ({ data, setData, setDisplayRules }: {
  data: { type: string, jeu: string, description: string, img: string, id: number },
  setDisplayRules: (input: boolean) => void,
  setData: (input: { type: string, jeu: string, description: string, img: string, id: number }) => void
}) => {

  const handleClick = () => {
    setDisplayRules(false)
    setData({
      type: " ",
      jeu: " ",
      description: " ",
      img: " ",
      id: 0
    })
  }
  return (
    <View style={{
      height: "90%",
      padding: 10
    }}>
      <CircleButton handlePress={handleClick} data={{ img: require("../../images/goBack.png") }} />
      <Text
        style={{
          fontSize: 24,
          fontFamily: 'Barlow_800ExtraBold',
          letterSpacing: 5,
          textAlign: "center"
        }}>
        {data.jeu}
      </Text>
      <View style={{
        height: 10
      }}>

      </View>
      <Text
        style={{
          textAlign: "justify"
        }}>
        {data.description}
      </Text>
    </View>
  )
}

export default RuleCard