import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {
  ExtentionMessageConst,
  GameConst,
  YakushokuConst,
  YakushokuImg,
  ZinneiConst,
} from '../../const';
import MyButton from '../../components/MyButton';
import {showAndWaitAlert} from '../../components/MyAlert';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

const Action: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;
  const buttonList = [];
  const YakuhokuList = [];
  // 色設定　朝:夜
  const BackgroundColor =
    game.AsaOrYoru === GameConst.ASA ? '#e1f7fa' : '#57585A';
  // const FontColor = game.AsaOrYoru === GameConst.ASA ? 'black' : 'white';
  const ButtonColor = game.AsaOrYoru === GameConst.ASA ? 'blue' : 'blue';
  const ButtonFontColor = game.AsaOrYoru === GameConst.ASA ? 'white' : 'white';

  const styles = StyleSheet.create({
    scrollView: {
      paddingHorizontal: 90,
      // backgroundColor: 'red',
    },
    container: {
      flex: 1,
      backgroundColor: BackgroundColor,
    },
    container2: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 25,
      fontWeight: 'bold',
      margin: 16,
      color: 'black',
    },
    text2: {
      fontSize: 25,
      fontWeight: 'bold',
      margin: 16,
      color: 'white',
    },
    imageStyle: {
      width: 1100 / 4,
      height: 1100 / 4,
      marginTop: 30,
      color: 'black',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    yaku_kakunin_image: {
      color: '#e1f7fa',
    },
    BackgroundColor: {
      backgroundColor: 'white',
      margin: 16,
    },
  });

  if (game.getFinalVoteFlag()) {
    for (const [i, player] of game.FinalVoteTargetPlayers.entries()) {
      buttonList.push(
        <MyButton
          key={i}
          title={player.getName()}
          onPress={() => Tap(player.getName(), 1)}
        />,
      );
    }
  } else {
    for (const [i, player] of game.players.entries()) {
      if (
        player.getName() !== game.getNowPlayer().getName() &&
        !player.getIsDeath()
      ) {
        buttonList.push(
          <MyButton
            key={i}
            title={game.players[i].getName()}
            onPress={() => {
              if (
                game.players[i].getYakushoku().getName() !=
                YakushokuConst.ZINROU
              ) {
                Tap(player.getName(), 1);
              } else {
                Alert.alert(
                  '襲撃レベルを選択してください', // アラートのタイトル
                  '', // アラートのメッセージ
                  [
                    {
                      text: 'キャンセル',
                      onPress: () => console.log('キャンセルが押されました'),
                      style: 'cancel',
                    },
                    {
                      text: 'なんとなく(1票)',
                      onPress: () => Tap(player.getName(), 1),
                    },
                    {
                      text: 'あえて殺そう(2票)',
                      onPress: () => Tap(player.getName(), 2),
                    },
                    {
                      text: '殺さないと危険(3票)',
                      onPress: () => Tap(player.getName(), 3),
                    },
                  ],
                  {cancelable: false}, // （オプション）画面の他の部分をタップしてアラートを閉じることを禁止
                );
              }
            }}
          />,
        );
      }
    }
  }

  for (const [i, player] of game.players.entries()) {
    var name: string = player.getName();

    YakuhokuList.push(
      <Text key={i} style={styles.text}>{`${name}：${game.players[i]
        .getYakushoku()
        .getName()}`}</Text>,
    );
  }

  const yaku_kakunin_Tap = () => {
    game.nextPlayer();
    game.decrementCanAction();

    if (game.compareDidActionCountToPlayersCount()) {
      game.shukei();
      navigation.navigate('ActionResult', {game});
    } else {
      navigation.navigate('Kakunin', {game});
    }
  };

  const Tap = async (tName: string, nAction: number) => {
    //死んだ人の初期化
    game.asa_dethplayer = '';
    game.yoru_dethplayer = 'いません';
    if (game.AsaOrYoru === GameConst.ASA) {
      console.log(
        '朝のアクション',
        `${game.getNowPlayer().getName()} >>> ${tName}`,
      );
      game.asa(tName);
      game.didActionCount();
    } else {
      console.log(
        '夜のアクション',
        `${game.getNowPlayer().getName()}(${game
          .getNowPlayer()
          .getYakushoku()
          .getName()}) >>> ${tName}`,
      );
      for (let i = 0; i < nAction; i++) {
        game.yoru(tName);
      }
      // 占い師の場合、選択したプレイヤーの役職をアラートで表示
      if (
        game.getNowPlayer().getYakushoku().getName() == YakushokuConst.URANAISI
      ) {
        let title: string = `占い結果`;
        let uranaiResult: string = `${tName}は、${game.gatUranaiResult()}`;
        await showAndWaitAlert(title, uranaiResult);
      }
      game.didActionCount();
    }

    game.nextPlayer();

    // 全員アクション済みの場合
    if (game.compareDidActionCountToPlayersCount()) {
      /// 次の画面がアクションリザルト画面の場合
      game.shukei();

      if (game.getFinalVoteFlag()) {
        navigation.navigate('Kakunin', {game});
      } else {
        navigation.navigate('ActionResult', {game});
      }
    } else {
      navigation.navigate('Kakunin', {game});
    }
  };

  //「朝or夜」＆役職ごとに定型分を切り替える
  var message = '';
  if (game.AsaOrYoru == GameConst.YORU) {
    switch (game.getNowPlayer().getYakushoku().getName()) {
      case '市民':
        message = ExtentionMessageConst.SIMIN;
        break;
      case '人狼':
        message = ExtentionMessageConst.ZINROU;
        break;
      case '占い師':
        message = ExtentionMessageConst.URANAISI;
        break;
      case '騎士':
        message = ExtentionMessageConst.KISHI;
        break;
      default:
    }
  } else {
    message = ExtentionMessageConst.SIMIN;
  }

  //役職画像追加
  const YakushokuImg = (): JSX.Element => {
    if (game.getNowPlayer().getYakushoku().getName() == '市民') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/市民画像.jpeg')}
        />
      );
    } else if (game.getNowPlayer().getYakushoku().getName() == '人狼') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/人狼画像.jpeg')}
        />
      );
    } else if (game.getNowPlayer().getYakushoku().getName() == '占い師') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/占い師画像.jpeg')}
        />
      );
    } else if (game.getNowPlayer().getYakushoku().getName() == '騎士') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/騎士画像.jpeg')}
        />
      );
    } else {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/市民画像.jpeg')}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {game.getNowPlayer().getIsDeath() == false ? (
        //生きている場合
        <View style={styles.main}>
          {game.AsaOrYoru == GameConst.ASA ? (
            <ImageBackground
              source={require('../../img/朝画像.jpeg')}
              style={styles.image}>
              <View style={styles.text}>
                <Text style={styles.text}>{`ステータス【朝】`}</Text>
                {game.getFinalVoteFlag() ? (
                  <Text style={styles.text}>{`決選投票`}</Text>
                ) : (
                  ''
                )}
                <Text style={styles.text}>
                  {`あなたは「${game.getNowPlayer().getName()}」です。`}
                </Text>
                <Text style={styles.text}>{message}</Text>
                <ScrollView style={styles.scrollView}>
                  {
                    // 決選投票の場合
                    game.getFinalVoteFlag()
                      ? game.FinalVoteTargetPlayers.map((player, i) => (
                          <MyButton
                            key={i}
                            title={player.getName()}
                            onPress={() => Tap(player.getName(), 1)}
                          />
                        ))
                      : // 通常の朝の場合
                        game.players.map((player, i) => {
                          if (
                            game.getNowPlayer().getName() != player.getName() &&
                            player.getIsDeath() == false
                          ) {
                            return (
                              <MyButton
                                key={i}
                                title={player.getName()}
                                onPress={() => Tap(player.getName(), 1)}
                              />
                            );
                          }
                          // 条件に一致しない場合は何も返さない
                          else {
                            return null;
                          }
                        })
                  }
                </ScrollView>
              </View>
            </ImageBackground>
          ) : (
            //夜の場合
            <View style={styles.main}>
              <Text style={styles.text2}>{`ステータス【夜】`}</Text>
              <Text style={styles.text2}>
                {`${game.getNowPlayer().getName()}は「${game
                  .getNowPlayer()
                  .getYakushoku()
                  .getName()}」です。`}
              </Text>
              <YakushokuImg></YakushokuImg>
              <Text style={styles.text2}>
                {`あなたは「${game.getNowPlayer().getName()}」です。`}
              </Text>
              <Text style={styles.text2}>{message}</Text>
              <ScrollView style={styles.scrollView}>
                {game.players.map((player, i) => {
                  if (
                    game.getNowPlayer().getName() != player.getName() &&
                    player.getIsDeath() == false
                  ) {
                    // 今のプレイヤーが人狼の場合
                    if (
                      game.getNowPlayer().getYakushoku().getName() ==
                      YakushokuConst.ZINROU
                    ) {
                      return (
                        <View
                          key={i}
                          style={{display: 'flex', flexDirection: 'row'}}>
                          <MyButton
                            key={i}
                            title={game.players[i].getName()}
                            backgroundColor={
                              game.players[i].getYakushoku().getName() ==
                              YakushokuConst.ZINROU
                                ? 'red'
                                : 'blue'
                            }
                            onPress={() => {
                              Alert.alert(
                                '襲撃レベルを選択してください', // アラートのタイトル
                                '', // アラートのメッセージ
                                [
                                  {
                                    text: 'キャンセル',
                                    onPress: () =>
                                      console.log('キャンセルが押されました'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'なんとなく(1票)',
                                    onPress: () => Tap(player.getName(), 1),
                                  },
                                  {
                                    text: 'あえて殺そう(2票)',
                                    onPress: () => Tap(player.getName(), 2),
                                  },
                                  {
                                    text: '殺さないと危険(3票)',
                                    onPress: () => Tap(player.getName(), 3),
                                  },
                                ],
                                {cancelable: false}, // （オプション）画面の他の部分をタップしてアラートを閉じることを禁止
                              );
                            }}
                          />
                          <Text>殺意票：{player.getShuugekiCount()}</Text>
                        </View>
                      );
                      // 今のプレイヤーが人狼以外の場合
                    } else {
                      return (
                        <MyButton
                          key={i}
                          title={player.getName()}
                          onPress={() => Tap(player.getName(), 1)}
                        />
                      );
                    }
                  }
                })}
              </ScrollView>
            </View>
          )}
        </View>
      ) : (
        //死んでいる場合
        <ImageBackground
          source={require('../../img/役職確認画面.jpeg')}
          style={styles.image}>
          <View style={styles.container2}>
            <Text style={styles.text2}>【各プレイヤーの役職内訳】</Text>
          </View>
          <View style={styles.BackgroundColor}>{YakuhokuList}</View>
          <View>
            <MyButton title={'next'} onPress={yaku_kakunin_Tap} />
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default Action;
