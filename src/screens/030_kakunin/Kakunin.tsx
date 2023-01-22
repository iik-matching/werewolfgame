import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {GameClass} from '../../classes/GameClass';
import {PlayerClass} from '../../classes/PlayerClass';
import {
  JinrouClass,
  KishiClass,
  ShiminClass,
  UranaishiClass,
} from '../../classes/yakushoku';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Kakunin'>;

const Kakunin: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  function Tap() {
    //アクション画面に移動
    navigation.navigate('Action', {game});
  }

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Kakunin</Text>
      <Button title="next" onPress={Tap} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Kakunin;
