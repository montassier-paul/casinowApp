import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'

const LearnHeader = () => {
    return (

        <View
            style={{
                margin: 10,
                borderBottomWidth: 1,
                borderRadius: 20,
                borderColor: COLORS.DarkPurple,
            }}>
            <View
                style={{
                    alignItems: "center",

                }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontFamily: 'Barlow_800ExtraBold',
                        letterSpacing: 5
                    }}>Découvrir les jeux</Text>
            </View>

            <Text />

            <View
                style={{
                    width: "100%",
                    height: 50
                }}>
                <Image
                    source={require("../../images/icons8-poker-53.png")}
                    resizeMode="center"
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            <Text />

            <View
                style={{
                    alignItems: "center",

                }}>
                <Text
                    style={{
                        fontSize: 15,
                        fontFamily: 'Barlow_300Light_Italic',
                        textAlign: "justify",
                        width: "90%"
                    }}>L'univers des jeux est très riche. Apprenenez les règles des jeux
                    des établissements</Text>
                <Text />

            </View>

        </View>
    )
}

export default LearnHeader