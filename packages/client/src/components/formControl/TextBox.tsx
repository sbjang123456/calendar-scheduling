import './FormControl.scss';

import React, { useState } from 'react';
import classNames from 'utils/classNames';

interface TextBoxProps {
    type: string;
    name?: string;
    value?: string;
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    error?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = ({
                     type,
                     name,
                     value,
                     label,
                     fullWidth,
                     required,
                     error,
                     onChange
                 }: TextBoxProps): React.ReactElement => {
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
        >
            <label className={classNames('label', fadeType)}>{required && '*'} {label}</label>
            <div className={classNames('input', fadeType)}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className='control'
                    onChange={onChange}
                    onFocus={handleFade('focus')}
                    onBlur={handleFade('blur')}
                />
            </div>
        </div>
    );
};

TextBox.defaultProps = {
    type: 'text'
};

export default TextBox;