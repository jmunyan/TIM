export interface Ticket {
    id: string;
    description: string;
    priority?: 'low' | 'medium' | 'high';
    createdAt: string; // ISO date string
    updatedAt?: string; // ISO date string
    assignee?: string;
    tags?: string[];
    po: string;
    co?: string;
    location: 'Receiving' | 'Blast' | 'Powder' | 'Takedown' | 'Shipping' | 'Upcoming' | 'Wash' | 'Masking' ;
    notes?: string;
    color: string;
    canInvoice?: boolean;
    customerName: string; // probably temp field for testing purposes, will use id and mapping later on
    customerId?: string;
}