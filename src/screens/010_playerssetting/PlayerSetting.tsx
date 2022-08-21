import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';

//画面遷移用　公式サイト参照　意味は不明
export type HomeStackNavigatorParamList = {
  YakushokuSetting: undefined;
};
type Props = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  'YakushokuSetting'
>;

const PlayerSetting: React.FC<Props> = ({navigation}) => {
  function Tap() {
    navigation.navigate('YakushokuSetting');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>PlayerSettingView</Text>
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

export default PlayerSetting;
