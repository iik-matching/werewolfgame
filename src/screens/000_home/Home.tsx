import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = ({navigation}) => {
  //次の画面へ
  function Tap() {
    //Propsを渡しながら画面遷移
    navigation.navigate('PlayerSetting', {
      test1: 86,
      test2: 'anything you want here',
      test3: 'aiuoe',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Home</Text>
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
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Home;
