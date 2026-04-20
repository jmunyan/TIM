import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import '../../assets/styles/schedule_styles.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import TicketCard from '../../components/TicketCard';
import { Ticket } from '../../constants/Ticket';
import MoveTicketDialog from '@/components/Dialogs/MoveTicketDialog';
import { useAuth } from '@/context/auth';

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
    const router = useRouter();
    const { token, authFetch, user } = useAuth();
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const [isMvTktDlgOpen, setIsMvTktDlgOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        if (!token) return;
        authFetch('/api/jobs')
            .then(res => res.json())
            .then(data => {
                const mappedTickets: Ticket[] = data.jobs.map(job => ({
                    id: job.id.toString(),
                    po: `PO${job.ticket_no}`,
                    co: `CO${job.ticket_no}`,
                    location: job.location,
                    notes: job.notes,
                    color: job.color,
                    description: job.description,
                    createdAt: job.created_at,
                    customerName: job.customer_name,
                }));
                setTickets(mappedTickets);
            })
            .catch(err => console.error('Failed to fetch jobs:', err));
    }, [token, authFetch]);

    useEffect(() => {
        if (!token || !user) return;

        const ws = new WebSocket(`ws://localhost:3000/cable?token=${token}`); // Adjust URL for production

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                    channel: 'ScheduleChannel'
                })
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'ping') return; // Ignore pings
            if (data.message && data.message.type === 'job_updated') {
                // Update tickets state with new job data
                setTickets(prev => {
                    const updated = prev.map(ticket =>
                        ticket.id === data.message.job.id.toString() ? { ...ticket, ...data.message.job } : ticket
                    );
                    return updated;
                });
            }
        };

        ws.onclose = () => console.log('WebSocket disconnected');

        return () => ws.close();
    }, [token, user]);



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
        newTicketButton: {
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 16,
            marginBottom: 16,
            alignSelf: 'flex-start',
        },
        newTicketButtonText: {
            color: '#fff',
            fontWeight: '700',
        },
    });

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
        setCurrentTicket(ticket);
        setIsMvTktDlgOpen(true);
    }

    const handleMoveTicket = (destination: string, note: string) => {
        if (!currentTicket) {
            return;
        }

        setTickets(prev =>
            prev.map(ticket =>
                ticket.id === currentTicket.id
                    ? { ...ticket, location: destination, notes: note || ticket.notes }
                    : ticket
            )
        );
        setIsMvTktDlgOpen(false);
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Schedule</Text>
            <TouchableOpacity style={[styles.newTicketButton, { backgroundColor: colors.tint }]} onPress={() => router.push('/new-ticket')}>
              <Text style={styles.newTicketButtonText}>Create New Ticket</Text>
            </TouchableOpacity>
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
            <MoveTicketDialog
                isVisible={isMvTktDlgOpen}
                onCancel={() => setIsMvTktDlgOpen(false)}
                onSubmit={handleMoveTicket}
                currentTicket={currentTicket}
            />
        </>
    );
};

export default SchedulePage;