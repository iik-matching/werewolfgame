import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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

const YakushokuSetting: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {PlayerNames} = route.params;

  function Tap() {
    //ゲームを作成し、次の画面に渡す
    var arr = [
      new JinrouClass(),
      new KishiClass(),
      new UranaishiClass(),
      new ShiminClass(),
      new ShiminClass(),
    ];

    arr = shuffle(arr);

    navigation.navigate('Kakunin', {
      game: new GameClass([
        new PlayerClass('Aさん', arr[0]),
        new PlayerClass('Bさん', arr[1]),
        new PlayerClass('Cさん', arr[2]),
        new PlayerClass('Dさん', arr[3]),
        new PlayerClass('Eさん', arr[4]),
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

  const [isNZinrou, setIsNZinrou] = React.useState(1);
  const [isNSimin, setIsNSimin] = React.useState(0);
  const [isNKishi, setIsNKishi] = React.useState(1);
  const [isNUranai, setIsNUranai] = React.useState(1);

  const [enable1, setEneble1] = React.useState(true);
  const [enable2, setEneble2] = React.useState(true);

  React.useEffect(() => {
    //人狼騎士占い師に１人づつ割り振ってある
    setIsNSimin(PlayerNames.length - 3);

    canButtons();
  }, []);

  function addZinrou(val: number) {
    setIsNZinrou(isNZinrou + val);
    setIsNSimin(isNSimin - val);
    canButtons();
  }
  function addShimin() {}
  function addKishi() {}
  function addUranai() {}

  //この状況でできる操作を適応する関数
  function canButtons() {
    //人狼がプラスできるかどうか
    setEneble1(checkCanGame(isNZinrou + 1, isNSimin, isNKishi, isNUranai));
    setEneble2(checkCanGame(isNZinrou - 1, isNSimin, isNKishi, isNUranai));
  }

  function checkCanGame(
    nZinrou: number,
    nShimin: number,
    nKishi: number,
    nUranai: number,
  ) {
    if (nZinrou != 0 && nZinrou < nShimin + nKishi + nUranai) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>役職設定</Text>

      <Text style={styles.greeting}>全体人口:{PlayerNames.length}</Text>

      <View style={styles.row}>
        <Text style={styles.greeting}>人狼:{isNZinrou}</Text>
        {enable1 ? (
          <Button title="+" onPress={() => addZinrou(1)} />
        ) : (
          <Button title="+" onPress={() => addZinrou(1)} />
        )}
        {enable2 ? (
          <Button title="-" onPress={() => addZinrou(-1)} />
        ) : (
          <Button disabled title="-" onPress={() => addZinrou(-1)} />
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.greeting}>市民:{isNSimin}</Text>
        <Text style={styles.greeting}>+</Text>
        <Text style={styles.greeting}>-</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.greeting}>騎士：{isNKishi}</Text>
        <Text style={styles.greeting}>+</Text>
        <Text style={styles.greeting}>-</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.greeting}>占い師:{isNUranai}</Text>
        <Text style={styles.greeting}>+</Text>
        <Text style={styles.greeting}>-</Text>
      </View>
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  eneble: {
    backgroundColor: 'gray',
  },
  uneneble: {
    backgroundColor: 'red',
  },
});

export default YakushokuSetting;
