import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#DDECF6', dark: '#17232F' }}>
      <View style={styles.container}>
        <ThemedText type="title" style={styles.title}>TIM Dashboard</ThemedText>
        <ThemedText style={styles.subtitle}>Quick access to schedule, tickets, and settings.</ThemedText>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={() => router.push('/schedule')}
          >
            <Text style={styles.buttonText}>Open Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={() => router.push('/new-ticket')}
          >
            <Text style={styles.buttonText}>New Ticket</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={() => router.push('/settings/1')}
          >
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 18,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
