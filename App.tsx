import React, {type PropsWithChildren} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/000_home/Home';
import PlayerSetting from './src/screens/010_playerssetting/PlayerSetting';
import YakushokuSetting from './src/screens/020_yakushokusetthing/YakushokuSetting';
import Kakunin from './src/screens/030_kakunin/Kakunin';
import {IYakushoku} from './src/classes/interface';
import {GameClass} from './src/classes/GameClass';

export type RootStackParamList = {
  Home: undefined;
  PlayerSetting: undefined;
  YakushokuSetting: PlayerNames;
  Kakunin: MasterProps;
};

type MasterProps = {
  game: GameClass;
};

type PlayerNames = {
  PlayerNames: string[];
};

//const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PlayerSetting" component={PlayerSetting} />
        <Stack.Screen name="YakushokuSetting" component={YakushokuSetting} />
        <Stack.Screen name="Kakunin" component={Kakunin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
