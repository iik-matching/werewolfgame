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
import {GameClass} from '../../classes/GameClass';
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

  return (
    <SafeAreaView style={styles.container}>
      {game.AsaOrYoru == GameConst.ASA ? (
        <>
          <Text style={styles.text}>アクション結果画面</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>吊られたのは、、、</Text>
          <Text style={styles.text}>○○さんでした。</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>恐ろしい夜、やってきます。</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>アクション結果画面</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>コケコッコー</Text>
          <Text style={styles.text}></Text>
          <Text style={styles.text}>昨晩の犠牲者は、、、</Text>
          <Text style={styles.text}>○○さんでした。</Text>
        </>
      )}

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
