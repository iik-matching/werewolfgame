import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {ExtentionMessageConst, GameConst} from '../../const';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

const Action: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  const Tap = (tName: string) => {
    game.didActionCount();
    if (game.AsaOrYoru === GameConst.ASA) {
      console.log('朝のアクションを実行');
      game.asa(tName);
    } else {
      console.log('夜のアクションを実行');
      game.yoru(tName);
    }

    if (game.compareDidActionCountToPlayersCount()) {
      if (game.AsaOrYoru === GameConst.ASA) {
        game.shukei();
      } else {
        game.yoru_shuukei();
      }
      navigation.navigate('ActionResult', {game});
    } else {
      navigation.navigate('Kakunin', {game});
    }

    //
    //Gameの動いている様子を見る
    //
  };

  //「朝or夜」＆役職ごとに定型分を切り替える
  var message = '';
  if (game.AsaOrYoru == GameConst.YORU) {
    switch (game.players[game.nowIndex].getYakushoku().getName()) {
      case '市民':
        console.log('市民');
        message = ExtentionMessageConst.SIMIN;
        break;
      case '人狼':
        console.log('人狼');
        message = ExtentionMessageConst.ZINROU;
        break;
      case '占い師':
        console.log('占い師');
        message = ExtentionMessageConst.URANAISI;
        break;
      case '騎士':
        console.log('騎士');
        message = ExtentionMessageConst.KISHI;
        break;
      default:
        console.log('その他');
    }
  } else {
    message = ExtentionMessageConst.SIMIN;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>{`ステータス【${game.AsaOrYoru}】`}</Text>
      <Text style={styles.greeting}>
        {`あなたは「${game.players[game.nowIndex]
          .getYakushoku()
          .getName()}」です。`}
      </Text>
      <Text style={styles.greeting}>{message}</Text>
      <Button
        title={game.players[0].getName()}
        onPress={() => Tap(game.players[0].getName())}
      />
      <Button
        title={game.players[1].getName()}
        onPress={() => Tap(game.players[1].getName())}
      />
      <Button
        title={game.players[2].getName()}
        onPress={() => Tap(game.players[2].getName())}
      />
      <Button
        title={game.players[3].getName()}
        onPress={() => Tap(game.players[3].getName())}
      />
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

export default Action;
