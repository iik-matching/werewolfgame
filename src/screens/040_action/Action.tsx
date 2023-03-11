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

  const Tap = (tName: string) => {
    game.didActionCount();
    if (game.AsaOrYoru === GameConst.ASA) {
      game.asa(tName);
    } else {
      game.yoru(tName);
    }

    if (game.compareDidActionCountToPlayersCount()) {
      game.shukei();
      navigation.navigate('ActionResult', {game});
    } else {
      navigation.navigate('Kakunin', {game});
    }

    console.log('game', game);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>{ExtentionMessageConst.SIMIN}</Text>
      <Button
        title={game.players[0].getName()}
        onPress={() => Tap(game.players[0].getName())}
      />
      <Button
        title={game.players[1].getName()}
        onPress={() => Tap(game.players[1].getName())}
      />
      <Button
        title={game.players[2].getName()}
        onPress={() => Tap(game.players[2].getName())}
      />
      <Button
        title={game.players[3].getName()}
        onPress={() => Tap(game.players[3].getName())}
      />
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
