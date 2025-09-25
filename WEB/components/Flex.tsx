import React from 'react';

export default function Flex({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%' }}>
            {children}
        </div>
    );
}