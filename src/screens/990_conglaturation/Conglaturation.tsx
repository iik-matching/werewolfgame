import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import MyButton from '../../components/MyButton';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Conglaturation'>;

const Conglaturation: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  var flag: string = game.hantei();

  function Tap() {
    //ゲームを作成し、次の画面に渡す
    navigation.navigate('Home');
  }

  return (
    <ImageBackground
      source={
        flag == '1'
          ? require('../../img/人狼勝利_背景画像.jpeg')
          : require('../../img/市民勝利_背景画像.jpeg')
      }
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        {flag == '1' ? (
          <Image
            style={styles.image2}
            source={require('../../img/人狼勝利.png')}
          />
        ) : (
          <Image
            style={styles.image2}
            source={require('../../img/市民勝利.png')}
          />
        )}

        <MyButton title={'next'} onPress={Tap} />
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
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 573 / 4,
    height: 610 / 4,
    marginTop: 50,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image2: {
    width: 400,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Conglaturation;
