import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT, SIZES } from '../constants'
import { propsPicker } from './interface'



const Picker = ({ data, setDate }: propsPicker) => {

    const [displayModal, setDisplayModal] = useState(false)

    const handleOnclick = (value: string) => {

        setDisplayModal(prev => !prev)
        setDate(value)

    }


    return (

        <View>

            <TouchableOpacity
                delayPressIn={50}
                onPress={() => setDisplayModal(prev => !prev)}
                style={{
                    flexDirection: "row",
                    width: '90%',
                    justifyContent: "space-around",
                    marginVertical: 15
                }}>
                {data.date === "Unknown" ? <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>Select a date</Text> :
                    <Text style={{ fontFamily: FONT.Text1, fontSize: SIZES.TextMiddle }}>{data.date}</Text>}
                <Image
                    source={require("../images/icons8-trier-24.png")}
                    style={{ width: 15, height: 15 }}
                />
            </TouchableOpacity>


            {displayModal
                &&
                <ScrollView style={{ zIndex: 1, backgroundColor: COLORS.White, width: "60%", marginLeft: "5%", alignSelf: "flex-start", maxHeight: 250, flex: 1, elevation: 10, position: "absolute" }}>

                    <TouchableOpacity
                        delayPressIn={50}
                        onPress={() => handleOnclick("Unknown")}>
                        <Text style={{ paddingBottom: 20, paddingLeft: 5, fontFamily: FONT.Text1, fontSize: SIZES.HeaderTextSize }}>Select a date</Text>
                    </TouchableOpacity>

                    {data.dates.map((date, key) => {
                        return <TouchableOpacity
                            delayPressIn={50}
                            key={key}
                            onPress={() => handleOnclick(date)}>
                            <Text style={{ paddingBottom: 20, paddingLeft: 5, fontFamily: FONT.Text1, fontSize: SIZES.HeaderTextSize }}>{date}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>


            }


        </View>
    )
}

export default Picker