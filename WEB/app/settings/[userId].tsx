import React from 'react';
import { View, Text } from 'react-native';

// the ticketId can be accessde using the useLocalSearchParams hook
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';

export default function TicketDetails() {
    const { userId } = useLocalSearchParams();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: 'white' }}>userId {userId}</Text>
        </View>
    );
}