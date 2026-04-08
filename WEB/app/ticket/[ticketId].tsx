import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

export default function TicketDetails() {
    const { ticketId } = useLocalSearchParams();
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}> 
            <ThemedText type="title" style={styles.title}>Ticket Details</ThemedText>
            <ThemedText>ID: {ticketId}</ThemedText>
            <ThemedText style={styles.section}>Customer: Sample Customer</ThemedText>
            <ThemedText style={styles.section}>Status: New</ThemedText>
            <ThemedText style={styles.section}>Location: Upcoming</ThemedText>
            <ThemedText style={styles.section}>Notes: Example ticket loaded from route params.</ThemedText>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.tint }]}
                onPress={() => router.back()}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        marginBottom: 16,
    },
    section: {
        marginTop: 12,
    },
    button: {
        marginTop: 24,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
});