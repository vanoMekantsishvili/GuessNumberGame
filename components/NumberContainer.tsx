import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Color } from '../assets/styles/colors';

export interface NumberContainerProps {
  children: React.ReactNode;
}

export default function NumberContainer({ children }: NumberContainerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const deviseWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Color.yellow,
    padding: deviseWidth < 380 ? 12 : 24,
    margin: deviseWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Color.yellow,
    fontSize: deviseWidth < 380 ? 28 : 36,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  },
});
