import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONT } from '../../constants'
import { UserInfoCard } from '../Cards'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchData } from '../../redux/api'
import { ContextTypes } from '../interface'
import { getUser, resetfamilyName, resetfirstName, updateSmsBool, updateUserInfo } from '../../redux/userSlice'


const UserForm = () => {

    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()

    const [firstName, setFirstName] = useState("")
    const [familyName, setFamilyName] = useState("")
    const [telNumber, setTelNumber] = useState("")
    const handleCheckBox = () => {
        dispatch(updateSmsBool())
    }


    const handleUpdate = async () => {

        const UserData = {
            firstName: firstName.length !== 0 ? firstName : user.firstName,
            familyName: familyName.length !== 0 ? familyName : user.familyName,
            numTel: telNumber.length !== 0 ? telNumber : user.numTel,
        }


        if (user.smsBool && (user.numTel || telNumber)) {
            // create or update user 
            await dispatch(fetchData({
                context: ContextTypes.user,
                userApiParams: {
                    context: "update", remote: user.smsBool,
                    numTel: telNumber.length !== 0 ? telNumber : user.numTel, body: UserData, followings: user.followings
                }
            }))
        }

        if (!user.smsBool && telNumber) {
            //delete user
            await dispatch(fetchData({
                context: ContextTypes.user,
                userApiParams: {
                    context: "delete", remote: user.smsBool,
                    numTel: user.numTel, body: UserData
                }
            }))

        }

        if (user.smsBool && !telNumber) {
            // cannot receive update without telNumber
            dispatch(updateSmsBool())
            dispatch(getUser())
            dispatch(updateUserInfo(UserData))
        }

        else {

            await dispatch(fetchData({
                context: ContextTypes.user,
                userApiParams: {
                    context: "update", remote: user.smsBool,
                    numTel: user.numTel, body: UserData
                }
            }))

        }


        setFirstName("")
        setFamilyName("")
        setTelNumber("")
    }



    const handleRemove = async (context: String) => {
        switch (context) {
            case 'FirstName':
                dispatch(resetfirstName())
                break;
            case "Telephone":
                await dispatch(fetchData({
                    context: ContextTypes.user,
                    userApiParams: {
                        context: "delete", remote: user.smsBool,
                        numTel: user.numTel
                    }
                }))
                break;

            case "FamilyName":
                dispatch(resetfamilyName())
                break;

            default:

        }
    }

    return (
        <View style={{
            width: "100%",
            margin: 5,

        }}>
            <Text style={{
                alignSelf: "center",
                fontFamily: FONT.TitleBold,
                marginTop: 10,

            }}>INFORMATIONS UTILISATEURS + {String(user.hasErrors)}</Text>

            <View style={{
                width: "80%",
                alignSelf: "center"
            }}>

                {user.firstName.length !== 0 && <UserInfoCard data={{ input: user.firstName, context: "FirstName" }} handleRemove={handleRemove} />}
                {user.familyName.length !== 0 && <UserInfoCard data={{ input: user.familyName, context: "FamilyName" }} handleRemove={handleRemove} />}
                {user.numTel.length !== 0 && <UserInfoCard data={{ input: user.numTel, context: "Telephone" }} handleRemove={handleRemove} />}




                <TextInput
                    onChangeText={setFirstName}
                    value={firstName}
                    maxLength={20}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5,
                        fontFamily: FONT.Text1


                    }}
                    placeholder="First Name" />

                <TextInput
                    onChangeText={setFamilyName}
                    value={familyName}
                    maxLength={20}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5,
                        fontFamily: FONT.Text1

                    }}
                    placeholder="Family Name" />


                <TextInput
                    onChangeText={setTelNumber}
                    keyboardType={'numeric'}
                    maxLength={10}
                    value={telNumber}
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 10,
                        paddingHorizontal: 5,
                        fontFamily: FONT.Text1

                    }}
                    placeholder="Tel" />


                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    marginTop: 10,
                }}>
                    <Text style={{ fontFamily: FONT.Text1, width: "80%" }}>
                        Voulez-vous recevoir les jackpots exceptionnels par sms ?
                    </Text>

                    <View style={{ width: "20%", flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity
                            onPress={handleCheckBox}
                            style={{
                                height: 20,
                                width: 20,
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 10,
                                backgroundColor: user.smsBool ? COLORS.Green : COLORS.White,

                            }}>

                        </TouchableOpacity>

                    </View>

                </View>


                <TouchableOpacity
                    onPress={handleUpdate}
                    style={{
                        alignSelf: "center",
                        marginTop: 15,
                        height: 30,
                        width: 80,
                        borderRadius: 10,
                        borderWidth: 1,
                        backgroundColor: COLORS.LightPurpleTransparent,
                        borderColor: COLORS.DarkPurple,
                        paddingTop: 5
                    }}>
                    <Text style={{
                        alignSelf: "center",
                        fontFamily: FONT.TitleBold
                    }}>Update</Text>
                </TouchableOpacity>

            </View>


        </View >
    )
}

export default UserForm

