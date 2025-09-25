import React from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

type ButtonProps = {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    bst?: 'primary' | 'secondary' | 'danger';
    style?: React.CSSProperties;
};

const ThemedButton: React.FC<ButtonProps> = ({ label, onClick, bst, style }) => {
    const isDark: string = useThemeColor({ light: 'true', dark: '' }, 'text');

    const bgColorLight = {
        primary: '#225edeff',
        secondary: '#777777ff',
        danger: '#c66464ff',
    };
    const bgColorDark = {
        primary: '#194198ff',
        secondary: '#555555ff',
        danger: '#b92742ff',
    };
    
    return (
        <button
            onClick={onClick}
            style={{
                borderRadius: '5px',
                backgroundColor: isDark ? bgColorDark[bst || 'primary'] : bgColorLight[bst || 'primary'],
                color: '#fff',
                padding: '0.5rem 1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                ...style
            }}
            className="ui-button"
        >
            {label}
        </button>
    );
}

export default ThemedButton;