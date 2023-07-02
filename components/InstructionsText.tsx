import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { Color } from '../assets/styles/colors';

export interface InstructionsTextProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function InstructionsText({
  children,
  style,
}: InstructionsTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instructionText: {
    color: Color.yellow,
    fontSize: 24,
    fontFamily: 'open-sans',
  },
});
