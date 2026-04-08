import React, { useEffect, useState } from "react";

import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';    
import DialogFooter from "./DialogFooter";

export default function MoveTicketDialog({
  isVisible,
  onCancel,
  currentTicket,
  onSubmit,
}: {
  isVisible: boolean;
  onCancel: () => void;
  currentTicket?: any;
  onSubmit?: (destination: string, note: string) => void;
}) {

  const sections = [
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'Blast', value: 'Blast' },
    { label: 'Garnet', value: 'Garnet' },
    { label: 'Cabinet', value: 'Cabinet' },
    { label: 'Wash', value: 'Wash' },
    { label: 'Masking', value: 'Masking' },
    { label: 'Powder', value: 'Powder' },
    { label: 'Takedown', value: 'Takedown' },
    { label: 'Invoice', value: 'Invoice' },
  ];

  const [selectedSection, setSelectedSection] = useState<string>(currentTicket?.location ?? 'Upcoming');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (currentTicket?.location) {
      setSelectedSection(currentTicket.location);
    }
  }, [currentTicket]);

  const handleSubmit = () => {
    onSubmit?.(selectedSection, note);
  };

  return (
    <Dialog
      header="Move Ticket"
      footer={<DialogFooter onCancel={onCancel} onSubmit={handleSubmit} />}
      visible={isVisible}
      style={styles.dialog}
      onHide={onCancel}
    >
      <p>{currentTicket ? `Moving: ${currentTicket.description}` : 'Choose a destination.'}</p>
      <Dropdown
        style={styles.input}
        options={sections}
        value={selectedSection}
        onChange={(e) => setSelectedSection(e.value)}
        placeholder="Choose section"
      />
      <InputTextarea
        style={styles.input}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note"
        rows={3}
      />
    </Dialog>
  );
}

const styles = {
    dialog: { width: '50vw' },
    input: { width: '100%', marginBottom: 12 },
};