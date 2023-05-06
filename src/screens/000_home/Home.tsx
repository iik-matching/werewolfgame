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
import MyButton from '../../components/MyButton';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('PlayerSetting');
  }

  return (
    <ImageBackground
      source={require('../../img/ホーム画面.jpeg')}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text2}>人狼ゲーム</Text>
        <MyButton title={'start'} onPress={Tap} />
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text2: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 16,
    color: 'white',
  },
});

export default Home;
