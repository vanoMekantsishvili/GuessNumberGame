import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Color } from '../assets/styles/colors';

export interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <View style={styles.inputContainer}>{children}</View>;
}

const deviseWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: deviseWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Color.backgroundColor,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
