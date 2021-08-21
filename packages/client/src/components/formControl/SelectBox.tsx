import './FormControl.scss';

import React, { useState } from 'react';
import classNames from 'utils/classNames';

export interface SelectBoxProps extends React.PropsWithChildren<any> {
    value?: string;
    label?: string;
    width?: number;
    fullWidth?: boolean;
    required?: boolean;
    error?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({
                       children,
                       value,
                       label,
                       width,
                       fullWidth,
                       required,
                       error,
                       onChange
                   }: SelectBoxProps): React.ReactElement => {
    const [fadeType, setFadeType] = useState<string>('blur');

    const handleFade = (type: string) => () => {
        setFadeType(type);
    };

    return (
        <div
            className={classNames(
                'FormControl',
                fullWidth && 'fullWidth',
                error && 'error'
            )}
            style={{ width: width }}
        >
            <label className={classNames('label', fadeType)}>{required && '*'} {label}</label>
            <div className={classNames('input', fadeType)}>
                <select
                    value={value}
                    className='control'
                    onChange={onChange}
                    onFocus={handleFade('focus')}
                    onBlur={handleFade('blur')}
                >
                    {children}
                </select>
            </div>
        </div>
    );
};

export default SelectBox;