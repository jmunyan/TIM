import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme, ThemeProvider } from '@react-navigation/native';
import '../../assets/styles/schedule_styles.css';

import TicketCard from '../../components/TicketCard';
import { Ticket } from '../../constants/Ticket';

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

    const tickets = useMemo((): Ticket[] => [
        {
            id: '1',
            po: 'PO1001',
            co: 'CO2001',
            location: 'Upcoming',
            notes: 'Urgent delivery',
            color: 'Red',
            description: 'Powder coating for frames',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'intec',
        },
        {
            id: '2',
            po: 'PO1002',
            co: 'CO2002',
            location: 'Upcoming',
            notes: 'Requires masking',
            color: 'Blue',
            description: 'Blast and mask panels',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'john',
        },
        {
            id: '3',
            po: 'PO1003',
            co: 'CO2003',
            location: 'Upcoming',
            notes: 'Handle with care',
            color: 'Green',
            description: 'Garnet blast for pipes',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'custom fence',
        },
        {
            id: '4',
            po: 'PO1004',
            co: 'CO2004',
            location: 'Blast',
            notes: 'Check for defects',
            color: 'Yellow',
            description: 'Cabinet wash for parts',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'intec',
        },
        {
            id: '5',
            po: 'PO1005',
            co: 'CO2005',
            location: 'Blast',
            notes: 'Invoice pending',
            color: 'Black',
            description: 'Powder coat brackets',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'john',
        },
        {
            id: '6',
            po: 'PO1006',
            co: 'CO2006',
            location: 'Wash',
            notes: 'Rush order',
            color: 'White',
            description: 'Masking and powder coat',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'custom fence',
        },
        {
            id: '7',
            po: 'PO1007',
            co: 'CO2007',
            location: 'Wash',
            notes: 'Special color mix',
            color: 'Orange',
            description: 'Blast and powder coat',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'intec',
        },
        {
            id: '8',
            po: 'PO1008',
            co: 'CO2008',
            location: 'Masking',
            notes: 'Customer pickup',
            color: 'Purple',
            description: 'Wash and takedown',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'john',
        },
        {
            id: '9',
            po: 'PO1009',
            co: 'CO2009',
            location: 'Powder',
            notes: 'Fragile',
            color: 'Pink',
            description: 'Cabinet and powder',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'custom fence',
        },
        {
            id: '10',
            po: 'PO1010',
            co: 'CO2010',
            location: 'Powder',
            notes: 'Needs inspection',
            color: 'Gray',
            description: 'Masking for rails',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'intec',
        },
        {
            id: '11',
            po: 'PO1011',
            co: 'CO2011',
            location: 'Takedown',
            notes: 'Awaiting materials',
            color: 'Brown',
            description: 'Blast and invoice',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'john',
        },
        {
            id: '12',
            po: 'PO1012',
            co: 'CO2012',
            location: 'Takedown',
            notes: 'Ready for shipment',
            color: 'Cyan',
            description: 'Powder coat and takedown',
            createdAt: '2024-06-01T10:00:00Z',
            customerName: 'custom fence',
        }
    ], []);

    const ticketsBySection = useMemo(() => {
        const grouped: Record<string, typeof tickets> = {};
        sections.forEach(section => {
            grouped[section] = tickets.filter(ticket => ticket.location === section);
        });
        return grouped;
    }, [tickets]);

    const toggleSection = (label: string) => {
        setOpenSections(prev => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const openSendDialog = (ticket: Ticket) => {
        // Open dialog to select section to send ticket to
        // On selection, update ticket location via API call
        alert(`Send ticket ${ticket.id} to another section (functionality not implemented).`);
    }

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
                            {ticketsBySection[label] && ticketsBySection[label].length > 0 ? (
                                ticketsBySection[label].map(ticket => (
                                    <TicketCard key={ticket.id} ticket={ticket} sendToAction={() => openSendDialog(ticket)} />
                                ))
                            ) : (
                                <Text style={styles.placeholder}>No tickets in this section.</Text>
                            )}
                        </View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

export default SchedulePage;