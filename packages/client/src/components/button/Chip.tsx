import './Chip.scss';

import React from 'react';

interface ChipProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Chip = ({ label, onClick }: ChipProps): React.ReactElement => {
    return (
        <button
            className="Chip"
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default Chip;