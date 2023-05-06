import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {ExtentionMessageConst, GameConst} from '../../const';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'PublicYakushoku'>;

const PublicYakushoku: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;
  const YakuhokuList = [];

  for (const [i, player] of game.players.entries()) {
    var name: string = player.getName();
    console.log('name', name);

    YakuhokuList.push(
      <Text key={i} style={styles.greeting}>{`${name}：${game.players[i]
        .getYakushoku()
        .getName()}`}</Text>,
    );
    console.log;
  }

  const Tap = () => {
    game.nowIndex++;

    game.decrementCanAction();

    if (game.compareDidActionCountToPlayersCount()) {
      if (game.AsaOrYoru === GameConst.ASA) {
        game.shukei();
      } else {
        game.shukei();
      }
      navigation.navigate('ActionResult', {game});
    } else {
      navigation.navigate('Kakunin', {game});
    }

    console.log('game', game);

    //
    //Gameの動いている様子を見る
    //
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>各プレイヤーの役職内訳</Text>
      {YakuhokuList}
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

export default PublicYakushoku;
