import React from 'react';

import ThemedButton from './ThemedButton';
import Flex from '../Flex';

export default function DialogFooter() {
    return (
        <Flex>
            <ThemedButton style={{ float: 'left' }} bst='danger' label="Cancel" onClick={() => {}} />
            <ThemedButton style={{ float: 'right' }} bst='primary' label="Confirm" onClick={() => {}} />
        </Flex>
    );
}