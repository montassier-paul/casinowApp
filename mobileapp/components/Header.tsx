import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from "../constants"

const Header = () => {
  return (
    <View style={{
      position: "absolute",
      zIndex: 10,
      backgroundColor: COLORS.LightPurple,
      width: "100%"
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Text style={{
          fontSize: SIZES.HeaderTextSize,
          fontFamily: FONT.Title,
          color: COLORS.DarkPurple,
          letterSpacing: SIZES.HeaderSpacing
        }}>CASINOW</Text>


        <View style={{ width: 70, height: 70, paddingTop: 10 }}>
          <Image
            source={require("../images/Logo.png")}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Header