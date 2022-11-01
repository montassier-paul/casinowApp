import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const GameCard = ({ data, setData, setDisplayRules }: {
  data: { type: string, jeu: string, description: string, img: string, id: number },
  setDisplayRules: (input: boolean) => void,
  setData: (input: { type: string, jeu: string, description: string, img: string, id: number }) => void
}) => {

  const handleClick = () => {
    setDisplayRules(true)
    setData(data)
  }

  return (
    <TouchableOpacity
      delayPressIn={50}
      onPress={handleClick}
      style={{
        marginHorizontal: 20,
        height: 70,
        backgroundColor: COLORS.LightPurple,
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: "space-evenly",
        flexDirection: "row"
      }}>

      <View style={{
        height: "100%",
        width: "50%",
        justifyContent: "center",
        flexDirection: "row",

      }}>

        <View
          style={{
            padding: 5,
          }}>
          {data.type === "Table"
            ? <Image
              source={require("../../images/icons8-poker-53.png")}
              resizeMode="contain"
              style={{ height: "70%", alignSelf: "center", marginTop: "10%" }}
            />
            : <Image
              source={require("../../images/icons8-slot-64.png")}
              resizeMode="contain"
              style={{ height: "70%", alignSelf: "center", marginTop: "10%" }}
            />

          }
        </View>

        <Text style={{
          alignSelf: "center",
          textAlign: "justify",
          fontFamily: 'Barlow_800ExtraBold',
        }}>{data.type}</Text>
      </View>
      <View style={{
        width: "50%"
      }}>

        <View style={{
          height: "100%",
          justifyContent: "center"
        }}>
          <Text style={{
            textAlign: "justify",
            fontFamily: 'Barlow_500Medium',
          }}
          >{data.jeu}</Text>
        </View>


      </View>
    </TouchableOpacity>
  )
}

export default GameCard