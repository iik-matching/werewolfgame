import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Kakunin'>;

const Kakunin: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  function Tap() {
    navigation.navigate('Home');

    //
    //Gameの動いている様子を見る
    //

    //投票
    game.asa('Bさん');
    game.asa('Aさん');
    game.asa('Aさん');
    game.asa('Aさん');

    //集計
    game.shukei();

    game.yoru('Aさん');
    game.yoru('Aさん');
    game.yoru('Aさん');
    game.yoru('Aさん');

    //判定処理
    //夜の集計
    //死んだ人の行動制限
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Kakunin</Text>
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

export default Kakunin;
