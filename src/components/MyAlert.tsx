import {Alert} from 'react-native';

export async function showAndWaitAlert(title: string, message: string) {
  return new Promise(resolve => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => resolve(true),
        },
      ],
      {cancelable: false},
    );
  });
}
