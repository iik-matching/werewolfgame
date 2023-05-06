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
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {
  ExtentionMessageConst,
  GameConst,
  YakushokuConst,
  YakushokuImg,
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
  const FontColor = game.AsaOrYoru === GameConst.ASA ? 'black' : 'white';
  const ButtonColor = game.AsaOrYoru === GameConst.ASA ? 'blue' : 'blue';
  const ButtonFontColor = game.AsaOrYoru === GameConst.ASA ? 'white' : 'white';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BackgroundColor,
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 16,
      color: FontColor,
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
  });

  if (game.getFinalVoteFlag()) {
    for (const [i, player] of game.FinalVoteTargetPlayers.entries()) {
      buttonList.push(
        <MyButton
          key={i}
          title={player.getName()}
          onPress={() => Tap(player.getName())}
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
            onPress={() => Tap(game.players[i].getName())}
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

  const Tap = async (tName: string) => {
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
      game.yoru(tName);
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

    if (game.compareDidActionCountToPlayersCount()) {
      /// 次の画面がアクションリザルト画面の場合
      game.shukei();
      if (game.gameendflag != '0') {
        /// 次の画面がコングラッチュレーション画面の場合
        navigation.navigate('Conglaturation', {game});
      } else if (game.getFinalVoteFlag()) {
        navigation.navigate('Kakunin', {game});
      } else {
        navigation.navigate('ActionResult', {game});
      }
    } else {
      navigation.navigate('Kakunin', {game});
    }
    game.nextPlayer();
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
                {buttonList}
              </View>
            </ImageBackground>
          ) : (
            //夜の場合
            <View style={styles.main}>
              <Text style={styles.text}>{`ステータス【夜】`}</Text>
              <Text style={styles.text}>
                {`${game.getNowPlayer().getName()}は「${game
                  .getNowPlayer()
                  .getYakushoku()
                  .getName()}」です。`}
              </Text>
              <YakushokuImg></YakushokuImg>
              <Text style={styles.text}>
                {`あなたは「${game.getNowPlayer().getName()}」です。`}
              </Text>
              <Text style={styles.text}>{message}</Text>
              {buttonList}
            </View>
          )}
        </View>
      ) : (
        //死んでいる場合
        <ImageBackground
          source={require('../../img/役職確認画面.jpeg')}
          style={styles.image}>
          <Text style={styles.text2}>【各プレイヤーの役職内訳】</Text>
          <View>{YakuhokuList}</View>
          <View>
            <MyButton title={'next'} onPress={yaku_kakunin_Tap} />
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

export default Action;
