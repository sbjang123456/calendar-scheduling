import React, { useMemo } from 'react';
import SelectBox from './SelectBox';
import { getDayHours } from 'utils/dateUtils';
import { SelectBoxProps } from './SelectBox';

const TimeSelectBox = (props: SelectBoxProps): React.ReactElement => {
    const arrTime = useMemo<{ value: string, text: string }[]>(() => {
        return getDayHours();
    }, []);

    return (
        <SelectBox
            {...props}
        >
            {arrTime.map((time, idx) => (
                <option key={idx} value={time.value}>{time.text}</option>
            ))}
        </SelectBox>
    );
};

export default TimeSelectBox;