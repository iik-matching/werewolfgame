import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';

type MyButtonProps = TouchableOpacityProps & {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  minWidth?: number;
};

export default function MyButton(props: MyButtonProps) {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.backgroundColor ?? 'blue',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
      margin: 4,
      minWidth: props.minWidth ?? 0,
    },
    buttonText: {
      color: props.textColor ?? 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
