import React, { useState } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { arrDateState } from 'states/calendar';
import { Calendar } from 'components';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { sYear, sMonth, sDate } } = useRouter();

    // const [sYear, sMonth, sDate] = useRecoilValue(arrDateState);

    return (
        <main>
            <Calendar
                today={DateUtils.getDate()}
                sYear={sYear}
                sMonth={sMonth}
                sDate={sDate}
                onDateClick={() => {
                }}
                onScheduleClick={() => () => {
                }}
            />
        </main>
    );
};

export default ScheduleCalendarPage;