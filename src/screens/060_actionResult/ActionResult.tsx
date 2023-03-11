import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {RootStackParamList} from '../../../App';
import {GameConst} from '../../const';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'ActionResult'>;

const ActionResult: React.FC<Props> = ({route, navigation}) => {
  // ここでPropsを受け取る
  const {game} = route.params;

  function Tap() {
    navigation.navigate('Kakunin', {
      game,
    });
  }

  React.useEffect(() => {
    //ゲームの状態が「朝」なら「夜」に、「夜」なら「朝」に変更する
    if (game.AsaOrYoru == GameConst.ASA) {
      console.log('現在：朝 → 夜に切り替える');
      game.AsaOrYoru = GameConst.YORU;
    } else {
      console.log('現在：夜 → 朝に切り替える');
      game.AsaOrYoru = GameConst.ASA;
    }
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>アクション結果画面</Text>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ActionResult;
