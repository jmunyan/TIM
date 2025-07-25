import React from 'react';
import { View, Text } from 'react-native';

// the ticketId can be accessde using the useLocalSearchParams hook
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';

export default function TicketDetails() {
    const { ticketId } = useLocalSearchParams();
    
    // Fetch the ticket details using the ticketId
    // This could be a call to an API or a local database

    return (
        <View>
            <Text>Details for Ticket ID: {ticketId}</Text>
        </View>
    );
}