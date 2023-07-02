import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Color } from '../assets/styles/colors';

export interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function PrimaryButton({
  children,
  onPress,
}: PrimaryButtonProps) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        android_ripple={{ color: Color.buttonRippleColor }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Color.buttonColor,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
});
