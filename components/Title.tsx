import React from 'react';
import { StyleSheet, Text } from 'react-native';

export interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    margin: 16,
    fontFamily: 'open-sans-bold',
  },
});
