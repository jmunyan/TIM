import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme, ThemeProvider } from '@react-navigation/native';
import '../../assets/styles/schedule_styles.css';

const sections = [
    'Upcoming',
    'Blast',
    'Garnet',
    'Cabinet',
    'Wash',
    'Masking',
    'Powder',
    'Takedown',
    'Invoice',
];

const SchedulePage: React.FC = () => {
    const { colors } = useTheme();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.background,
        },
        header: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
            color: colors.text,
        },
        section: {
            marginBottom: 12,
            borderRadius: 8,
            backgroundColor: colors.card,
            overflow: 'hidden',
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: colors.border,
        },
        sectionHeaderText: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.text,
        },
        arrow: {
            fontSize: 18,
            color: colors.text,
        },
        sectionContent: {
            padding: 16,
            backgroundColor: colors.background,
        },
        placeholder: {
            color: colors.notification,
            fontStyle: 'italic',
        },
    });

    const toggleSection = (label: string) => {
        setOpenSections(prev => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Schedule</Text>
            {sections.map(label => (
                <View key={label} style={styles.section}>
                    <TouchableOpacity className='section-header' onPress={() => toggleSection(label)} style={styles.sectionHeader} >
                        <Text style={styles.sectionHeaderText}>{label}</Text>
                        <Text style={styles.arrow}>{openSections[label] ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {openSections[label] && (
                        <View style={styles.sectionContent}>
                            <Text style={styles.placeholder}>No {label} tickets.</Text>
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default SchedulePage;