import React, { memo } from 'react';

const CalendarDay = (): React.ReactElement => {

    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <div role='row' className='Day'>
            {
                dayOfWeek.map((day, idx) => (
                    <div key={idx} role='columnheader'>
                        {day}
                    </div>
                ))
            }
        </div>
    );
};

export default memo(CalendarDay);