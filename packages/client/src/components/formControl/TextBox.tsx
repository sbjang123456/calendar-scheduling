import './TextBox.scss';

import React, { useState } from 'react';
import classNames from 'utils/classNames';

interface TextBoxProps {
    value?: string;
    label?: string;
    fullWidth?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBox = ({ value, label, fullWidth, onChange }: TextBoxProps): React.ReactElement => {
    const [fadeType, setFadeType] = useState<string>('blur');

    const handleFade = (type: string) => () => {
        setFadeType(type);
    }

    return (
        <div className={classNames('TextBox', fullWidth && 'fullWidth')}>
            <label className={classNames('label', fadeType)}>{label}</label>
            <div className={classNames('input', fadeType)}>
                <input
                    type="text"
                    value={value}
                    className="control"
                    onChange={onChange}
                    onFocus={handleFade('focus')}
                    onBlur={handleFade('blur')}
                />
            </div>
        </div>
    );
}

export default TextBox;