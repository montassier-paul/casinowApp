import React, { useRef, useState } from 'react'
import { View, Image, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'
import { COLORS, FONT, SIZES } from '../constants'
import { propsSearch } from "./interface"



export const Search = ({ data, handleSearch }: propsSearch) => {

    // used by : tournament View, GamesMain


    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<TextInput>(null);



    const handleInput = (input: string) => {
        handleSearch(input, data.context)
        setInputValue(input)
    }

    const handleOnPress = (input: string) => {
        handleSearch(input, data.context)
        setInputValue(input)
    }

    return (

        <View>

            <View
                style={{
                    width: "80%",
                    height: 50,
                    borderRadius: 20,
                    backgroundColor: COLORS.LightPurple,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    marginVertical: 7,
                }}
            >
                <Image
                    source={require("../images/icons8-search-60.png")}
                    style={{ width: 20, height: 20 }}
                />
                <View style={{ width: 10 }} />

                <TextInput
                    ref={inputRef}
                    value={inputValue}
                    placeholder={data.text}
                    onChangeText={handleInput}
                    style={{ flex: 1, fontSize: SIZES.TextMiddle, fontFamily: FONT.Text2 }}
                />

            </View>

            {(data.suggestionData && inputRef.current?.isFocused() && inputValue.length > 0 && data.suggestionData.length > 0) &&


                <ScrollView style={{
                    width: "70%",
                    maxHeight: 150,
                    borderRadius: 5,
                    backgroundColor: COLORS.Camel,
                    position: "absolute",
                    alignSelf: "center",
                    paddingHorizontal: 10,
                    zIndex: 1,
                    elevation: 10,
                    marginTop: 65,
                    paddingVertical: 5,
                    flex: 1
                }}>


                    {data.suggestionData.map((data, key) => {
                        return <TouchableOpacity key={key}
                            style={{ width: "100%" }} ><Text onPress={handleOnPress.bind(this, data)} style={{ fontSize: SIZES.TextMiddle, fontFamily: FONT.Text2 }}>{data}</Text></TouchableOpacity>
                    }
                    )}

                </ScrollView>




            }


        </View>


    )
}
