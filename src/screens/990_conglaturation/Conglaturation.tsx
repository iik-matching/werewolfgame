import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';

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
    <SafeAreaView style={styles.container}>
      {flag == '1' ? <Text style={styles.greeting}>人狼勝利！！</Text> : <></>}
      {flag == '2' ? <Text style={styles.greeting}>市民勝利！！</Text> : <></>}

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

export default Conglaturation;
