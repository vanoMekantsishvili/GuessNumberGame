import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Color } from '../assets/styles/colors';
import Card from '../components/Card';
import InstructionsText from '../components/InstructionsText';
import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';

export interface StartGameProps {
  onPickNumber: (pickedNumber: number) => void;
}

export default function StartGame({ onPickNumber }: StartGameProps) {
  const [number, setNumber] = useState<string>('');

  const { width, height } = useWindowDimensions();

  const onNumberChange = (value: string) => {
    setNumber(value.replace(/[^0-9]/g, ''));
  };

  const onResetNumber = () => {
    setNumber('');
  };

  const onConfirm = () => {
    const chosenNumber = parseInt(number);

    if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99) {
      Alert.alert('Invalid number!', 'Number hast to be between 1 to 99', [
        { text: 'Ok', style: 'destructive', onPress: onResetNumber },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  };

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionsText>Enter a number</InstructionsText>

            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={number}
              onChangeText={onNumberChange}
            />

            <View style={styles.actionsContainer}>
              <View style={styles.buttonWrapper}>
                <PrimaryButton onPress={onResetNumber}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonWrapper}>
                <PrimaryButton onPress={onConfirm}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const deviseHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Color.yellow,
    borderBottomWidth: 2,
    color: Color.yellow,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  },
});
