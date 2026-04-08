import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider, useThemeMode } from '@/context/theme';
import DropdownMenu from '@/components/DropdownMenu';
import AuthProvider from '@/context/auth';

function AppContent() {
  const { resolvedTheme } = useThemeMode();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <NavigationThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
        <DropdownMenu />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="ticket/[ticketId]"
            options={({ route }) => ({
              title: route?.params?.ticketId ? `Ticket #${route?.params?.ticketId}` : 'Ticket Not Found',
            })}
          />
          <Stack.Screen name="new-ticket" options={{ title: 'New Ticket' }} />
          <Stack.Screen name="settings/[userId]" options={{ title: 'Settings' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </AuthProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
