import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Card from '../components/Card';
import GuessItem from '../components/GuessItem';
import InstructionsText from '../components/InstructionsText';
import NumberContainer from '../components/NumberContainer';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

const generateRandomBetween = (
  min: number,
  max: number,
  excludeNumber: number
): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === excludeNumber) {
    return generateRandomBetween(max, min, excludeNumber);
  }

  return rndNum;
};

export interface GameProps {
  userNumber: number;
  setIsGameOver: (isGameOver: boolean) => void;
  setGuessNumbersAmount: (guessNumbersAmount: number) => void;
}

export enum Direction {
  GREATER = 'GREATER',
  LOWER = 'LOWER',
}

export interface RenderItem {
  item: number;
  index: number;
}

export default function Game({
  userNumber,
  setGuessNumbersAmount,
  setIsGameOver,
}: GameProps) {
  const minBoundary = useRef(1);
  const maxBoundary = useRef(100);

  const { width, height } = useWindowDimensions();

  const initialGuess = useMemo(
    () =>
      generateRandomBetween(
        minBoundary.current,
        maxBoundary.current,
        userNumber
      ),
    [minBoundary.current, maxBoundary.current]
  );

  const [guessNumbers, setGuessNumbers] = useState<number[]>([initialGuess]);

  const [currentGuess, setCurrentGuess] = useState<number>(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setIsGameOver(true);
      setGuessNumbersAmount(guessNumbers.length);
    }
  }, [currentGuess, userNumber, setIsGameOver]);

  useEffect(() => {
    minBoundary.current = 1;
    maxBoundary.current = 100;
  }, []);

  const nextGuessHandler = (direction: Direction) => {
    if (
      (direction === Direction.LOWER && currentGuess < userNumber) ||
      (direction === Direction.GREATER && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'you know that this is wrong...', [
        { text: 'Ok', style: 'cancel' },
      ]);
      return;
    }

    if (direction === Direction.LOWER) {
      maxBoundary.current = currentGuess;
    } else {
      minBoundary.current = currentGuess + 1;
    }

    const newRandomNumber = generateRandomBetween(
      minBoundary.current,
      maxBoundary.current,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessNumbers((prevGuessNumbers) => [
      newRandomNumber,
      ...prevGuessNumbers,
    ]);
  };

  const renderItem = ({ item, index }: RenderItem) => {
    return (
      <GuessItem roundNumber={guessNumbers.length - index} guessNumber={item} />
    );
  };

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionsText style={styles.instructionsText}>
          Higher or Lower?
        </InstructionsText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.GREATER)}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.LOWER)}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.GREATER)}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => nextGuessHandler(Direction.LOWER)}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's guess</Title>
      {content}
      <View style={styles.guessNumbersListContainer}>
        {
          <FlatList
            data={guessNumbers}
            renderItem={renderItem}
            keyExtractor={(item) => item.toString()}
          />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  instructionsText: {
    marginBottom: 12,
  },
  guessNumbersListContainer: {
    marginHorizontal: 24,
    padding: 16,
    flex: 1,
  },
  buttonContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
