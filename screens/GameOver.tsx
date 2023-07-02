import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Color } from '../assets/styles/colors';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

export interface GameOverProps {
  onStartNewGame: () => void;
  roundsNumber: number;
  userNumber: number;
}

export default function GameOver({
  onStartNewGame,
  roundsNumber,
  userNumber,
}: GameOverProps) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over!!!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/success.png')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
          Yor Phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          rounds to guess number{' '}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  highlight: {
    color: Color.backgroundColor,
    fontFamily: 'open-sans-bold',
  },
  imageContainer: {
    borderRadius: 200,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Color.backgroundColor,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
