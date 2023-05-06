import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>人狼ゲーム</Text>
      <MyButton title={'start'} onPress={Tap} />
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

export default Home;
