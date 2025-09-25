import React from 'react';

import ThemedButton from '../ThemedButton';

export default function DialogFooter({onSubmit, onCancel}: {onSubmit?: () => void, onCancel?: () => void}) {
    return (
        <>
            <div style={{ width: '100%', padding: '5px' }}>
                <ThemedButton style={{ float: 'left' }} bst='danger' label="Cancel" onClick={onCancel} />
                <ThemedButton style={{ float: 'right' }} bst='primary' label="Confirm" onClick={onSubmit} />
            </div>
        </>
    );
}