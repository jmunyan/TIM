import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

type Part = {
    id: number;
    numberOfParts: number;
    partName: string;
    maskingRequired: boolean;
    notes: string;
};

export default function NewTicket() {
    const [customer, setCustomer] = useState("");
    const [parts, setParts] = useState<Part[]>([
        { id: 1, numberOfParts: 1, partName: "", maskingRequired: false, notes: "" },
    ]);
    const [description, setDescription] = useState("");
    const { colors } = useTheme();
    const router = useRouter();

    const handlePartChange = (index: number, field: keyof Part, value: any) => {
        setParts((prev) =>
            prev.map((part, i) =>
                i === index ? { ...part, [field]: value } : part
            )
        );
    };

    const addPart = () => {
        setParts((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                numberOfParts: 1,
                partName: "",
                maskingRequired: false,
                notes: "",
            },
        ]);
    };

    const removePart = (index: number) => {
        setParts((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreateTicket = () => {
        if (!customer.trim()) {
            alert('Please enter a customer name.');
            return;
        }

        const ticketData = {
            customer,
            description,
            parts,
        };

        console.log('Creating ticket', ticketData);
        alert('Ticket created successfully.');
        router.push('/schedule');
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}> 
            <ThemedText type="title" style={styles.title}>Create New Ticket</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>Add a new customer request and part details.</ThemedText>

            <View style={styles.field}>
                <ThemedText style={styles.label}>Customer</ThemedText>
                <TextInput
                    value={customer}
                    onChangeText={setCustomer}
                    placeholder="Customer name"
                    placeholderTextColor={colors.border}
                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>

            <View style={styles.field}>
                <ThemedText style={styles.label}>Description</ThemedText>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Ticket description"
                    placeholderTextColor={colors.border}
                    multiline
                    numberOfLines={4}
                    style={[styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                />
            </View>

            <ThemedText type="subtitle" style={styles.sectionTitle}>Parts</ThemedText>
            {parts.map((part, idx) => (
                <View key={part.id} style={[styles.partCard, { backgroundColor: colors.card, borderColor: colors.border }]}> 
                    <View style={styles.partHeader}>
                        <ThemedText type="subtitle">Part {idx + 1}</ThemedText>
                        {parts.length > 1 && (
                            <TouchableOpacity onPress={() => removePart(idx)}>
                                <Text style={[styles.removeText, { color: colors.notification }]}>Remove</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.field}>
                        <ThemedText style={styles.label}>Part name</ThemedText>
                        <TextInput
                            value={part.partName}
                            onChangeText={(text) => handlePartChange(idx, 'partName', text)}
                            placeholder="Part name"
                            placeholderTextColor={colors.border}
                            style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                        />
                    </View>

                    <View style={styles.fieldRow}>
                        <View style={[styles.field, styles.halfField]}>
                            <ThemedText style={styles.label}>Quantity</ThemedText>
                            <TextInput
                                value={String(part.numberOfParts)}
                                onChangeText={(text) => handlePartChange(idx, 'numberOfParts', Number(text) || 1)}
                                keyboardType="numeric"
                                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                            />
                        </View>
                        <View style={[styles.field, styles.halfField]}> 
                            <ThemedText style={styles.label}>Masking required</ThemedText>
                            <TouchableOpacity
                                onPress={() => handlePartChange(idx, 'maskingRequired', !part.maskingRequired)}
                                style={[styles.toggleButton, { backgroundColor: part.maskingRequired ? colors.primary : colors.border }]}>
                                <Text style={[styles.toggleText, { color: part.maskingRequired ? '#fff' : colors.text }]}> 
                                    {part.maskingRequired ? 'Yes' : 'No'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <ThemedText style={styles.label}>Notes</ThemedText>
                        <TextInput
                            value={part.notes}
                            onChangeText={(text) => handlePartChange(idx, 'notes', text)}
                            placeholder="Part notes"
                            placeholderTextColor={colors.border}
                            multiline
                            numberOfLines={2}
                            style={[styles.textArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                        />
                    </View>
                </View>
            ))}

            <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={addPart}
            >
                <Text style={[styles.actionButtonText, { color: colors.text }]}>Add Another Part</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: colors.primary }]}
                onPress={handleCreateTicket}
            >
                <Text style={styles.submitButtonText}>Create Ticket</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        marginBottom: 24,
        color: '#666',
    },
    sectionTitle: {
        marginTop: 16,
        marginBottom: 12,
    },
    field: {
        marginBottom: 16,
    },
    fieldRow: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-end',
    },
    halfField: {
        flex: 1,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
    },
    textArea: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    partCard: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 14,
        marginBottom: 16,
    },
    partHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    removeText: {
        fontWeight: '700',
    },
    actionButton: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    actionButtonText: {
        fontWeight: '700',
    },
    submitButton: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '700',
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    toggleText: {
        fontWeight: '700',
    },
});
