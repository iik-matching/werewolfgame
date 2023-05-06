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
import MyButton from '../../components/MyButton';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'PlayerSetting'>;

const PlayerSetting: React.FC<Props> = ({route, navigation}) => {
  function Tap() {
    //
    //同じ名前チェック
    //
    let arr = isNames.filter(function (val, idx, arr) {
      return arr.lastIndexOf(val) !== idx && arr.indexOf(val) === idx;
    });
    if (arr.length != 0) {
      //同じ名前があります
      console.log(`同じ名前があります`);
      Alert.alert('メッセージ', '同じ名前があります', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    navigation.navigate('YakushokuSetting', {
      PlayerNames: isNames,
    });
  }

  const [isNames, setIsNames] = React.useState([
    'Aさん',
    'Bさん',
    'Cさん',
    'Dさん',
    'Eさん',
  ]);

  function onChange(str: string, index: number) {
    setIsNames(isNames.map((name, i) => (i === index ? str : name)));
  }

  function addPlayer() {
    setIsNames([...isNames, `新規プレイヤー${isNames.length}`]);
  }

  function deletePlayer(index: number) {
    if (isNames.length == 4) {
      //これ以上は減らせません
      console.log(`これ以上は減らせません`);
      Alert.alert('メッセージ', 'これ以上は減らせません', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    console.log(`${index}を削除します`);
    setIsNames(isNames.filter((name, i) => i != index));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>プレイヤーの設定</Text>
      <ScrollView style={styles.scrollView}>
        {isNames.map((name, i) => (
          <View key={i} style={styles.row}>
            <TextInput
              style={[styles.text, styles.rowtext]}
              onChangeText={str => onChange(str, i)}
              value={name}
            />
            <Text
              style={[styles.text, styles.rowbutton]}
              onPress={() => deletePlayer(i)}>
              削除
            </Text>
          </View>
        ))}
      </ScrollView>

      <MyButton title={'プレイヤー追加'} onPress={addPlayer} />
      <MyButton title={'next'} onPress={Tap} />
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  rowtext: {
    width: '80%',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  rowbutton: {
    width: '20%',
    backgroundColor: 'red',
    textAlign: 'center',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightblue',
    overflow: 'hidden',
    marginLeft: 4,
  },
  scrollView: {
    backgroundColor: 'gray',
    marginHorizontal: 20,
    maxHeight: '60%',
    margin: 10,
  },
});

export default PlayerSetting;
