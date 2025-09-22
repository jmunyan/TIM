import React, { useState } from "react";

import { Dialog } from "PrimeReact/dialog";
import { Dropdown } from "PrimeReact/dropdown";

export default function MoveTicketDialog() {
    const [visible, setVisible] = React.useState(true);

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
        <Dialog header="Move Ticket" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <Dropdown options={sections} />
        </Dialog>
    );
}