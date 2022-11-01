import {Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../constants'
import { propsCircleButton, propsDirectButton } from './interface';




export const CircleButton = ({data, handlePress} : propsCircleButton) => {
    return (
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: COLORS.LightPurple,
          position: "absolute",
          left : 10, 
          bottom: 10, 
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlePress}
      >
        <Image
        source={data.img}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
      </TouchableOpacity>
    );
  };




export const DirectButton = ({data, handlePress} : propsDirectButton) => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          height: 60,
          backgroundColor: COLORS.BlueDunkel,
          position: "absolute",
          alignSelf:"center", 
          bottom: 10, 
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handlePress}
      >
        <Text style={{
          fontFamily:FONT.TitleBold,  
          fontSize:SIZES.HeaderTextSize
        }}>{data.input}</Text>
      </TouchableOpacity>
    );
  };