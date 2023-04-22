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
  const buttonList = [];

  for (const [i, player] of game.players.entries()) {
    if (player !== game.players[game.nowIndex] && !player.getIsDeath()) {
      buttonList.push(
        <Button
          key={i}
          title={game.players[i].getName()}
          onPress={() => Tap(game.players[i].getName())}
        />,
      );
    }
  }
  const TestFunc = () => {
    // 最後の人の場合
    if (game.compareDidActionCountToPlayersCount()) {
    }
  };

  const Tap = (tName: string) => {
    console.log(
      game.players[game.nowIndex].getName(),
      'がアクション実行！！！！！！！！！！！！！！！',
    );
    //死んだ人の初期化
    game.asa_dethplayer = '';
    game.yoru_dethplayer = 'いません';
    if (game.AsaOrYoru === GameConst.ASA) {
      console.log('朝のアクションを実行');
      game.asa(tName);
      game.didActionCount();
    } else {
      console.log('夜のアクションを実行');
      game.yoru(tName);
      game.didActionCount();
    }
    if (game.compareDidActionCountToPlayersCount()) {
      /// 次の画面がアクションリザルト画面の場合
      if (game.AsaOrYoru === GameConst.ASA) {
        game.shukei();
      } else {
        game.yoru_shuukei();
      }
      if (game.gameendflag != '0') {
        /// 次の画面がコングラッチュレーション画面の場合
        navigation.navigate('Conglaturation', {game});
      } else {
        navigation.navigate('ActionResult', {game});
      }
    } else {
      /// 次の画面が確認画面の場合
      console.log('check1');
      if (game.players[game.nowIndex].getIsDeath()) {
        console.log(game.players[game.nowIndex].getName());
        console.log('check2');
        if (!game.players[game.nowIndex].getPublicResultFlg()) {
          console.log('check3');
          game.nowIndex++;
        }
      }
      navigation.navigate('Kakunin', {game});
    }

    // //全てのプレイヤーがアクション済みの場合
    // console.log('チェック１');
    // if (game.compareDidActionCountToPlayersCount()) {
    //   console.log('チェック２');
    //   if (game.AsaOrYoru === GameConst.ASA) {
    //     console.log('チェック3');
    //     game.shukei();
    //   } else {
    //     console.log('チェック４');
    //     game.yoru_shuukei();
    //   }
    //   //ゲームが終了したら「conglatutaionへ遷移」
    //   if (game.gameendflag != '0') {
    //     console.log('チェック５');
    //     navigation.navigate('Conglaturation', {game});
    //   } else {
    //     console.log('チェック６');
    //     navigation.navigate('ActionResult', {game});
    //   }
    // } else if (game.players[game.nowIndex].getIsDeath()) {
    // } else {
    //   console.log('チェック１０');
    //   navigation.navigate('Kakunin', {game});
    // }
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
      {game.AsaOrYoru == GameConst.ASA ? (
        <View style={styles.backColorAsa}>
          <Text style={styles.greetingAsa}>{`ステータス【朝】`}</Text>
          <Text style={styles.greetingAsa}>
            {`あなたは「${game.players[game.nowIndex].getName()}」です。`}
          </Text>
          <Text style={styles.greetingAsa}>{message}</Text>
          {buttonList}
        </View>
      ) : (
        <View style={styles.backColorYoru}>
          <Text style={styles.greetingYoru}>{`ステータス【夜】`}</Text>
          <Text style={styles.greetingYoru}>
            {`あなたは「${game.players[game.nowIndex]
              .getYakushoku()
              .getName()}」です。`}
          </Text>
          <Text style={styles.greetingYoru}>
            {`あなたは「${game.players[game.nowIndex].getName()}」です。`}
          </Text>
          <Text style={styles.greetingYoru}>{message}</Text>
          {buttonList}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backColorAsa: {
    backgroundColor: '#96F1FF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backColorYoru: {
    backgroundColor: '#57585A',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingAsa: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: 'black',
  },
  greetingYoru: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: 'white',
  },
});
export default Action;
