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

  const [isNSimin, setIsNSimin] = React.useState(0);
  const [isNZinrou, setIsNZinrou] = React.useState(1);
  const [isNKishi, setIsNKishi] = React.useState(1);
  const [isNUranai, setIsNUranai] = React.useState(1);

  const [enable1, setEneble1] = React.useState(true); //人狼+
  const [enable2, setEneble2] = React.useState(true); //人狼-
  const [enable3, setEneble3] = React.useState(true); //騎士+
  const [enable4, setEneble4] = React.useState(true); //騎士-
  const [enable5, setEneble5] = React.useState(true); //占い師+
  const [enable6, setEneble6] = React.useState(true); //占い師-

  //ボタンを有効か無効にする
  function setEnableButtons() {
    let testEnable1 = true;
    let testEnable2 = true;
    let testEnable3 = true;
    let testEnable4 = true;
    let testEnable5 = true;
    let testEnable6 = true;

    //これ以上人狼増やせない場合
    if ((isNZinrou + 1) * 2 >= PlayerNames.length) testEnable1 = false;
    //これ以上人狼減らせない場合
    if (isNZinrou - 1 == 0) testEnable2 = false;
    //これ以上騎士増やせない場合
    if (isNKishi == 1) testEnable3 = false;
    //これ以上騎士減らせない場合
    if (isNKishi == 0) testEnable4 = false;
    //これ以上騎士増やせない場合
    if (isNUranai == 1) testEnable5 = false;
    //これ以上騎士減らせない場合
    if (isNUranai == 0) testEnable6 = false;

    setEneble1(testEnable1);
    setEneble2(testEnable2);
    setEneble3(testEnable3);
    setEneble4(testEnable4);
    setEneble5(testEnable5);
    setEneble6(testEnable6);
  }

  function addZinrou(val: number) {
    setIsNZinrou(isNZinrou + val);
    setIsNSimin(isNSimin - val);
  }
  function addKishi(val: number) {
    setIsNKishi(isNKishi + val);
    setIsNSimin(isNSimin - val);
  }
  function addUranai(val: number) {
    setIsNUranai(isNUranai + val);
    setIsNSimin(isNSimin - val);
  }

  React.useEffect(() => {
    setEnableButtons();
  }, [isNZinrou, isNKishi, isNUranai]);

  React.useEffect(() => {
    Reset();
  }, []);

  function Reset() {
    setIsNZinrou(1);
    setIsNSimin(PlayerNames.length - 3);
    setIsNKishi(1);
    setIsNUranai(1);

    setEneble1(true);
    setEneble2(true);
    setEneble3(true);
    setEneble4(true);
    setEneble5(true);
    setEneble6(true);

    setEnableButtons();
  }

  //
  //画面遷移
  //
  function Tap() {
    //人数分の役職を用意
    var yakushokuArr = [];
    for (var i = 0; i < isNSimin; i++) {
      yakushokuArr.push(new ShiminClass());
    }
    for (var i = 0; i < isNZinrou; i++) {
      yakushokuArr.push(new JinrouClass());
    }
    for (var i = 0; i < isNKishi; i++) {
      yakushokuArr.push(new KishiClass());
    }
    for (var i = 0; i < isNUranai; i++) {
      yakushokuArr.push(new UranaishiClass());
    }

    //シャッフル
    const shuffle = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    yakushokuArr = shuffle(yakushokuArr);

    //プレイヤーを作成
    let players = [];
    for (var i = 0; i < yakushokuArr.length; i++) {
      console.log(PlayerNames[i], yakushokuArr[i].name);
      players.push(new PlayerClass(PlayerNames[i], yakushokuArr[i]));
    }

    navigation.navigate('Kakunin', {
      game: new GameClass(players),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="デバッグ用ボタン" onPress={() => Reset()} />

      <Text style={styles.text}>役職設定</Text>

      <Text style={styles.text}>全体人口:{PlayerNames.length}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>市民:{isNSimin}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>人狼:{isNZinrou}</Text>
        {enable1 ? (
          <Text style={[styles.text, styles.blue]} onPress={() => addZinrou(1)}>
            +
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>+</Text>
        )}
        {enable2 ? (
          <Text
            style={[styles.text, styles.blue]}
            onPress={() => addZinrou(-1)}>
            -
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>-</Text>
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>騎士:{isNKishi}</Text>
        {enable3 ? (
          <Text style={[styles.text, styles.blue]} onPress={() => addKishi(1)}>
            +
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>+</Text>
        )}
        {enable4 ? (
          <Text style={[styles.text, styles.blue]} onPress={() => addKishi(-1)}>
            -
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>-</Text>
        )}
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>占い師:{isNUranai}</Text>
        {enable5 ? (
          <Text style={[styles.text, styles.blue]} onPress={() => addUranai(1)}>
            +
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>+</Text>
        )}
        {enable6 ? (
          <Text
            style={[styles.text, styles.blue]}
            onPress={() => addUranai(-1)}>
            -
          </Text>
        ) : (
          <Text style={[styles.text, styles.gray]}>-</Text>
        )}
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  blue: {
    color: 'blue',
  },
  gray: {
    color: 'gray',
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
