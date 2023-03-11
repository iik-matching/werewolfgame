import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {ExtentionMessageConst, GameConst} from '../../const';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

const Action: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;
  const buttonList = [];

  for (const [i, player] of game.players.entries()) {
    if (player !== game.players[game.nowIndex] && !player.getIsDeath()) {
      buttonList.push(
        <Button
          key={i}
          title={game.players[i].getName()}
          onPress={() => Tap(game.players[i].getName())}
        />,
      );
    }
  }

  const Tap = (tName: string) => {
    if (game.AsaOrYoru === GameConst.ASA) {
      game.asa(tName);
      game.didActionCount();
    } else {
      game.yoru(tName);
      game.didActionCount();
    }

    if (game.compareDidActionCountToPlayersCount()) {
      game.shukei();
      navigation.navigate('ActionResult', {game});
    } else if (game.players[game.nowIndex].getIsDeath()) {
      if (game.players[game.nowIndex].getPublicResultFlg()) {
        navigation.navigate('Kakunin', {game});
      } else {
        game.nowIndex++;
        navigation.navigate('Kakunin', {game});
      }
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
      <Text style={styles.greeting}>{ExtentionMessageConst.SIMIN}</Text>
      {buttonList}
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

export default Action;
