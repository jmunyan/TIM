import React, { useState } from "react";

import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import DialogFooter from "./DialogFooter";

export default function MoveTicketDialog({isVisible, onCancel, currentTicket, onChange, onSubmit}: {isVisible: boolean, onCancel: () => void, currentTicket?: any, onChange?: (value: any) => void, onSubmit?: () => void}) {

    // API call to get list of sections
    const sections = [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Blast', value: 'blast' },
        { label: 'Garnet', value: 'garnet' },
        { label: 'Cabinet', value: 'cabinet' },
        { label: 'Wash', value: 'wash' },
        { label: 'Masking', value: 'masking' },
        { label: 'Powder', value: 'powder' },
        { label: 'Takedown', value: 'takedown' },
        { label: 'Invoice', value: 'invoice' },
    ];

    return (
        <Dialog header="Move Ticket" footer={<DialogFooter onCancel={onCancel} onSubmit={onSubmit} />} visible={isVisible} style={{ width: '50vw' }} >
            <Dropdown options={sections} />
            
        </Dialog>
    );
}