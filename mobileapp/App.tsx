
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import { Home, Casinos, Events, Learn, Poker, Games, RootStackParamList, User, Settings, Direct } from './screens';
import {
  useFonts,
  Barlow_100Thin,
  Barlow_100Thin_Italic,
  Barlow_200ExtraLight,
  Barlow_200ExtraLight_Italic,
  Barlow_300Light,
  Barlow_300Light_Italic,
  Barlow_400Regular,
  Barlow_400Regular_Italic,
  Barlow_500Medium,
  Barlow_500Medium_Italic,
  Barlow_600SemiBold,
  Barlow_600SemiBold_Italic,
  Barlow_700Bold,
  Barlow_700Bold_Italic,
  Barlow_800ExtraBold,
  Barlow_800ExtraBold_Italic,
  Barlow_900Black,
  Barlow_900Black_Italic,
} from '@expo-google-fonts/barlow';

import store, { persistor } from "./redux/store";


const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded] = useFonts({
    Barlow_100Thin,
    Barlow_100Thin_Italic,
    Barlow_200ExtraLight,
    Barlow_200ExtraLight_Italic,
    Barlow_300Light,
    Barlow_300Light_Italic,
    Barlow_400Regular,
    Barlow_400Regular_Italic,
    Barlow_500Medium,
    Barlow_500Medium_Italic,
    Barlow_600SemiBold,
    Barlow_600SemiBold_Italic,
    Barlow_700Bold,
    Barlow_700Bold_Italic,
    Barlow_800ExtraBold,
    Barlow_800ExtraBold_Italic,
    Barlow_900Black,
    Barlow_900Black_Italic,
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home">
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Casinos" component={Casinos} />
            <RootStack.Screen name="Events" component={Events} />
            <RootStack.Screen name="Learn" component={Learn} />
            <RootStack.Screen name="Poker" component={Poker} />
            <RootStack.Screen name="Games" component={Games} />
            <RootStack.Screen name="Direct" component={Direct} />
            <RootStack.Screen name="User" component={User} />
            <RootStack.Screen name="Settings" component={Settings} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

