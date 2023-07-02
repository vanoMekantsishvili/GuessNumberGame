import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import { Color } from './assets/styles/colors';
import { globalStyles } from './assets/styles/global';
import Game from './screens/Game';
import GameOver from './screens/GameOver';
import StartGame from './screens/StartGame';

export default function App() {
  const [userNumber, setUserNumber] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [guessNumbersAmount, setGuessNumbersAmount] = useState<number>(0);

  const [isFontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!isFontsLoaded) {
    // Add any loading indicator for splash screen.
    return null;
  }

  const onNumberPick = (pickedNumber: number): void => {
    setUserNumber(pickedNumber);
    setIsGameOver(false);
  };

  const onStartNewGame = (): void => {
    setUserNumber(0);
  };

  let screen = <StartGame onPickNumber={onNumberPick} />;

  if (userNumber) {
    screen = (
      <Game
        userNumber={userNumber}
        setIsGameOver={setIsGameOver}
        setGuessNumbersAmount={setGuessNumbersAmount}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        onStartNewGame={onStartNewGame}
        roundsNumber={guessNumbersAmount}
        userNumber={userNumber}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Color.backgroundColor, Color.yellow]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.image}
      >
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
});
