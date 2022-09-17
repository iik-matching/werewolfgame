import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../../App';

//お決まり
type Props = NativeStackScreenProps<RootStackParamList, 'YakushokuSetting'>;

const YakushokuSetting: React.FC<Props> = ({navigation}) => {
  function Tap() {
    navigation.navigate('Kakunin', {});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>YakushokuSettingView</Text>
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

export default YakushokuSetting;
