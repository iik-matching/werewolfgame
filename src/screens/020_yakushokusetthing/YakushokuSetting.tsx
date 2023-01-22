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
type Props = NativeStackScreenProps<RootStackParamList, 'YakushokuSetting'>;

const YakushokuSetting: React.FC<Props> = ({navigation}) => {
  function Tap() {
    //ゲームを作成し、次の画面に渡す
    var arr = [
      new JinrouClass(),
      new KishiClass(),
      new UranaishiClass(),
      new ShiminClass(),
    ];

    arr = shuffle(arr);

    navigation.navigate('Kakunin', {
      game: new GameClass([
        new PlayerClass('Aさん', arr[0]),
        new PlayerClass('Bさん', arr[1]),
        new PlayerClass('Cさん', arr[2]),
        new PlayerClass('Dさん', arr[3]),
      ]),
    });
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
      <Text style={styles.greeting}>役職設定</Text>
      <Text style={styles.greeting}>人狼:１</Text>
      <Text style={styles.greeting}>市民:１</Text>
      <Text style={styles.greeting}>騎士：１</Text>
      <Text style={styles.greeting}>占い師:１</Text>
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

export default YakushokuSetting;
