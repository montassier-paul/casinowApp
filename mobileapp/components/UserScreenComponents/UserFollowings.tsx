import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { UserFollowingsCard } from '../Cards'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { fetchData } from '../../redux/api'
import { ContextTypes } from '../interface'
import { FONT, SIZES } from '../../constants'
import { propsUnfollowFollowingsUser } from '../interface'



const UserFollowings = () => {

    const user = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()




    const handleUnfollow = async ({ casinoId, purpose }: propsUnfollowFollowingsUser) => {


        await dispatch(fetchData({
            context: ContextTypes.user,
            userApiParams: {
                context : "unfollow", remote: user.smsBool,
                numTel: user.numTel, casinoId: casinoId, purpose: purpose
            }
        }
        ))

    }


    return (
        <View style={{
            width: "80%",
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 10,
            height: 250,

        }}>
            <FlatList
                data={user.followings}
                renderItem={({ item }) => <UserFollowingsCard data={item} handleUnfollow={handleUnfollow} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={{
                    alignSelf: 'center', marginTop: 5, fontFamily : FONT.Title, fontSize : SIZES.TextMiddle
                }}> Vous suivez actuellement : </Text>}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />
        </View>
    )
}

export default UserFollowings