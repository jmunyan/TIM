import React, { useState, useMemo } from 'react';
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

    // const tickets = fetch('https://BROKEN_URL/api/tickets')
    //     .then(res => res.json())

    // Helper to get a random section
    const getRandomSection = () => sections[Math.floor(Math.random() * sections.length)];

    const tickets = useMemo(() => [
        {
            id: 1,
            po: 'PO1001',
            co: 'CO2001',
            location: getRandomSection(),
            notes: 'Urgent delivery',
            color: 'Red',
            orderDescription: 'Powder coating for frames',
        },
        {
            id: 2,
            po: 'PO1002',
            co: 'CO2002',
            location: getRandomSection(),
            notes: 'Requires masking',
            color: 'Blue',
            orderDescription: 'Blast and mask panels',
        },
        {
            id: 3,
            po: 'PO1003',
            co: 'CO2003',
            location: getRandomSection(),
            notes: 'Handle with care',
            color: 'Green',
            orderDescription: 'Garnet blast for pipes',
        },
        {
            id: 4,
            po: 'PO1004',
            co: 'CO2004',
            location: getRandomSection(),
            notes: 'Check for defects',
            color: 'Yellow',
            orderDescription: 'Cabinet wash for parts',
        },
        {
            id: 5,
            po: 'PO1005',
            co: 'CO2005',
            location: getRandomSection(),
            notes: 'Invoice pending',
            color: 'Black',
            orderDescription: 'Powder coat brackets',
        },
        {
            id: 6,
            po: 'PO1006',
            co: 'CO2006',
            location: getRandomSection(),
            notes: 'Rush order',
            color: 'White',
            orderDescription: 'Masking and powder coat',
        },
        {
            id: 7,
            po: 'PO1007',
            co: 'CO2007',
            location: getRandomSection(),
            notes: 'Special color mix',
            color: 'Orange',
            orderDescription: 'Blast and powder coat',
        },
        {
            id: 8,
            po: 'PO1008',
            co: 'CO2008',
            location: getRandomSection(),
            notes: 'Customer pickup',
            color: 'Purple',
            orderDescription: 'Wash and takedown',
        },
        {
            id: 9,
            po: 'PO1009',
            co: 'CO2009',
            location: getRandomSection(),
            notes: 'Fragile',
            color: 'Pink',
            orderDescription: 'Cabinet and powder',
        },
        {
            id: 10,
            po: 'PO1010',
            co: 'CO2010',
            location: getRandomSection(),
            notes: 'Needs inspection',
            color: 'Gray',
            orderDescription: 'Masking for rails',
        },
        {
            id: 11,
            po: 'PO1011',
            co: 'CO2011',
            location: getRandomSection(),
            notes: 'Awaiting materials',
            color: 'Brown',
            orderDescription: 'Blast and invoice',
        },
        {
            id: 12,
            po: 'PO1012',
            co: 'CO2012',
            location: getRandomSection(),
            notes: 'Ready for shipment',
            color: 'Cyan',
            orderDescription: 'Powder coat and takedown',
        }
    ], []);

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
                            {tickets.map((ticket) => <Text key={ticket.id} >{ticket.po}</Text>) || <Text style={styles.placeholder}>No {label} tickets.</Text>}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default SchedulePage;