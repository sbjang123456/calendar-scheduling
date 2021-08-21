import './FormControl.scss';

import React, { useState } from 'react';
import classNames from 'utils/classNames';

interface SelectBoxProps extends React.PropsWithChildren<any> {
    value?: string;
    label?: string;
    width?: number;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBox = ({ children, value, label, width, onChange }: SelectBoxProps): React.ReactElement => {
    const [fadeType, setFadeType] = useState<string>('blur');

    const handleFade = (type: string) => () => {
        setFadeType(type);
    };

    return (
        <div className={'FormControl'} style={{ width: width }}>
            <label className={classNames('label', fadeType)}>{label}</label>
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