import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';

//画面遷移用　公式サイト参照　意味は不明
export type HomeStackNavigatorParamList = {
  Home: undefined;
};
type Props = NativeStackScreenProps<HomeStackNavigatorParamList, 'Home'>;

const Kakunin: React.FC<Props> = ({navigation}) => {
  function Tap() {
    navigation.navigate('Home');
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
