import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '@/global.css';

import { useColorScheme } from '@/src/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'Quicksand': require('../../assets/fonts/Quicksand-Regular.ttf'),
    'QuicksandLight': require('../../assets/fonts/Quicksand-Light.ttf'),
    'QuicksandMedium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'QuicksandBold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'QuicksandSemiBold': require('../../assets/fonts/Quicksand-SemiBold.ttf'),
    
    'JetBrainsMono': require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMonoBold': require('../../assets/fonts/JetBrainsMono-Bold.ttf'),
    'JetBrainsMonoLight': require('../../assets/fonts/JetBrainsMono-Light.ttf'),
    'JetBrainsMonoMedium': require('../../assets/fonts/JetBrainsMono-Medium.ttf'),
    'JetBrainsMonoExtraBold': require('../../assets/fonts/JetBrainsMono-ExtraBold.ttf'),
    'JetBrainsMonoBoldItalic': require('../../assets/fonts/JetBrainsMono-BoldItalic.ttf'),
    
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
