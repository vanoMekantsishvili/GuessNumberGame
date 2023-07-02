import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../assets/styles/colors';

export interface GuessItemProps {
  guessNumber: number;
  roundNumber: number;
}

export default function GuessItem({
  roundNumber,
  guessNumber,
}: GuessItemProps) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}># {roundNumber}</Text>
      <Text style={styles.itemText}>{guessNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Color.backgroundColor,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Color.yellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: 'open-sans',
  },
});
