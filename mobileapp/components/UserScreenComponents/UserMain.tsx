import { View } from 'react-native'
import React from 'react'
import UserForm from './UserForm'
import UserFollowings from './UserFollowings'



const UserMain = () => {
  return (
    <View>
      <UserForm />
      <UserFollowings />
    </View>
  )
}

export default UserMain