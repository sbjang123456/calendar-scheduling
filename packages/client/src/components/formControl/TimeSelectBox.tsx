import React, { useMemo } from 'react';
import SelectBox from './SelectBox';
import { lPad } from 'utils/dateUtils';

interface TimeSelectBoxProps {
    value?: string;
    label?: string;
    width?: number;
    fullWidth?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeSelectBox = ({ value, label, width, fullWidth, onChange }: TimeSelectBoxProps): React.ReactElement => {

    const arrTime = useMemo<{ value: string, text: string }[]>(() => {
        let times = [];
        for (let i = 0; i < 48; i++) {
            const hour = Math.floor(i / 2);
            const min = i % 2 !== 0 ? ':30' : ':00';
            const meridiem = hour >= 12 ? 'PM' : 'AM';
            const realHour = lPad(hour);
            const viewHour = `${meridiem} ${hour > 12 ? lPad(hour - 12) : lPad(hour === 0 ? 12 : hour)}`;
            times.push({
                value: realHour + min,
                text: viewHour + min
            });
        }
        return times;
    }, []);

    return (
        <SelectBox
            label={label}
            value={value}
            width={width}
            fullWidth={fullWidth}
            onChange={onChange}
        >
            {arrTime.map((time, idx) => (
                <option key={idx} value={time.value}>{time.text}</option>
            ))}
        </SelectBox>
    );
};

export default TimeSelectBox;