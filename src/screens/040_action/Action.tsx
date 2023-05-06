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
import {Alert} from 'react-native';
import MyButton from '../../components/MyButton';
import {PlayerClass} from '../../classes/PlayerClass';

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

  for (const [i, player] of game.players.entries()) {
    if (player !== game.players[game.nowIndex] && !player.getIsDeath()) {
      buttonList.push(
        <MyButton
          key={i}
          title={game.players[i].getName()}
          onPress={() => Tap(game.players[i].getName())}
          backgroundColor={ButtonColor}
          textColor={ButtonFontColor}
          minWidth={150}
        />,
      );
    }
  }

  for (const [i, player] of game.players.entries()) {
    var name: string = player.getName();
    console.log('name', name);

    YakuhokuList.push(
      <Text key={i} style={styles.text}>{`${name}：${game.players[i]
        .getYakushoku()
        .getName()}`}</Text>,
    );
    console.log;
  }

  const yaku_kakunin_Tap = () => {
    game.nowIndex++;

    game.decrementCanAction();

    if (game.compareDidActionCountToPlayersCount()) {
      game.shukei();
      navigation.navigate('ActionResult', {game});
    } else {
      navigation.navigate('Kakunin', {game});
    }

    console.log('game', game);

    //
    //Gameの動いている様子を見る
    //
  };

  async function showAndWaitAlert(title: string, message: string) {
    return new Promise(resolve => {
      Alert.alert(
        title,
        message,
        [
          {
            text: 'OK',
            onPress: () => resolve(true),
          },
        ],
        {cancelable: false},
      );
    });
  }

  const Tap = async (tName: string) => {
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

      // 占い師の場合、選択したプレイヤーの役職をアラートで表示
      if (
        game.players[game.nowIndex].getYakushoku().getName() ==
        YakushokuConst.URANAISI
      ) {
        let title: string = `占い結果`;
        let uranaiResult: string = `${tName}は、${game.gatUranaiResult()}`;
        await showAndWaitAlert(title, uranaiResult);
      }

      // いずれgameの中に移動する
      game.nowIndex++;

      game.didActionCount();
    }

    if (game.compareDidActionCountToPlayersCount()) {
      /// 次の画面がアクションリザルト画面の場合
      game.shukei();
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

  //役職画像追加
  const YakushokuImg = (): JSX.Element => {
    if (game.players[game.nowIndex].getYakushoku().getName() == '市民') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/市民画像.jpeg')}
        />
      );
    } else if (game.players[game.nowIndex].getYakushoku().getName() == '人狼') {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/人狼画像.jpeg')}
        />
      );
    } else if (
      game.players[game.nowIndex].getYakushoku().getName() == '占い師'
    ) {
      return (
        <Image
          style={styles.imageStyle}
          source={require('../../img/占い師画像.jpeg')}
        />
      );
    } else if (game.players[game.nowIndex].getYakushoku().getName() == '騎士') {
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
      {game.players[game.nowIndex].getIsDeath() == false ? (
        //生きている場合
        <View style={styles.main}>
          {game.AsaOrYoru == GameConst.ASA ? (
            <ImageBackground
              source={require('../../img/朝画像.jpeg')}
              style={styles.image}>
              <View style={styles.text}>
                <Text style={styles.text}>{`ステータス【朝】`}</Text>
                <Text style={styles.text}>
                  {`あなたは「${game.players[game.nowIndex].getName()}」です。`}
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
                {`あなたは「${game.players[game.nowIndex]
                  .getYakushoku()
                  .getName()}」です。`}
              </Text>
              <YakushokuImg></YakushokuImg>
              <Text style={styles.text}>
                {`あなたは「${game.players[game.nowIndex].getName()}」です。`}
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
