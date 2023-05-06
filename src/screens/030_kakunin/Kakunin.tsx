import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {GameClass} from '../../classes/GameClass';
import {PlayerClass} from '../../classes/PlayerClass';
import {
  JinrouClass,
  KishiClass,
  ShiminClass,
  UranaishiClass,
} from '../../classes/yakushoku';
import MyButton from '../../components/MyButton';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Kakunin'>;

const Kakunin: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  function Tap() {
    if (game.players[game.nowIndex].getPublicResultFlg()) {
      game.players[game.nowIndex].changePublicResultFlag(false);
      navigation.navigate('Action', {game});
    } else {
      //アクション画面に移動
      navigation.navigate('Action', {game});
    }
  }

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  console.log(
    'game.players[game.nowIndex].getName()',
    game.players[game.nowIndex].getName(),
  );
  console.log('game.AsaOrYoru', game.AsaOrYoru);

  return (
    <ImageBackground
      source={require('../../img/確認画面.png')}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.greeting}>【確認画面】</Text>
          <Text style={styles.greeting}>
            {`あなたは${game.players[game.nowIndex].getName()}ですか？`}
          </Text>
          <MyButton title={'next'} onPress={Tap} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 16,
    color: 'white',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Kakunin;
