import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen() {
    const { userId } = useLocalSearchParams();
    const { colors } = useTheme();
    const router = useRouter();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('My Company');
    const [location, setLocation] = useState('Main Shop');

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
            <ThemedText type="title" style={styles.title}>Settings</ThemedText>
            <ThemedText type="subtitle">User Settings</ThemedText>
            <View style={styles.field}>
                <ThemedText>Display name</ThemedText>
                <TextInput
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.border}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>
            <View style={styles.field}>
                <ThemedText>Email</ThemedText>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.border}
                    keyboardType="email-address"
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Organization Settings</ThemedText>
            <View style={styles.field}>
                <ThemedText>Company name</ThemedText>
                <TextInput
                    value={company}
                    onChangeText={setCompany}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>
            <View style={styles.field}>
                <ThemedText>Default location</ThemedText>
                <TextInput
                    value={location}
                    onChangeText={setLocation}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.tint }]}
                onPress={() => router.push('/schedule')}
            >
                <Text style={styles.buttonText}>Save settings</Text>
            </TouchableOpacity>
            <ThemedText style={styles.note}>User ID: {userId}</ThemedText>
        </ScrollView>
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
    sectionTitle: {
        marginTop: 20,
        marginBottom: 8,
    },
    field: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginTop: 8,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
    note: {
        marginTop: 16,
    },
});