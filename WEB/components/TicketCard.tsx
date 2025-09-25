import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ticket } from '../constants/Ticket';
import { useTheme } from '@react-navigation/native';
import { ThemedText } from './ThemedText';
import { useRouter } from 'expo-router';
import ThemedButton from './ThemedButton';
import Flex from './Flex';


export default function TicketCard({ ticket, sendToAction }: { ticket: Ticket, sendToAction: (ticket: Ticket) => void }) {
    const { colors } = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            marginBottom: 12,
            padding: 10,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8, 
            backgroundColor: colors.card,
            color: colors.text,
        },
        header: { 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 8,
            color: colors.text
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText type='subtitle' >{ticket.customerName}</ThemedText>
                <ThemedText type='subsubtitle' >PO: {ticket.po}</ThemedText>
            </View>
            <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{ticket.description}</ThemedText>
            <ThemedText>PO: {ticket.po} | CO: {ticket.co || '--'}</ThemedText> 
            <ThemedText>Location: {ticket.location}</ThemedText>
            <ThemedText>Color: {ticket.color}</ThemedText>
            <ThemedText>Notes: {ticket.notes}</ThemedText> 
            <Flex >
                <ThemedButton label='Go To Ticket' onClick={() => router.push(`/ticket/${ticket.id}`)} style={{ width: '48%', float: 'left' }} />
                <ThemedButton label='Send To' onClick={() => sendToAction(ticket)} style={{ width: '48%', float: 'right' }} />
            </Flex>
        </View>
    );
}