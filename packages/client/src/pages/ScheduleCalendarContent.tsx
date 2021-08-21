import React from 'react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import {
    scheduleDialogOpenState,
    scheduleListSelector
} from 'states/calendar';
import { Calendar } from 'components';
import { useRouter, useLoadableContent } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { sYear, sMonth, sDate } } = useRouter();

    const setScheduleDialogOpen = useSetRecoilState(scheduleDialogOpenState);
    const scheduleList = useRecoilValueLoadable(scheduleListSelector);
    const schedules = useLoadableContent(scheduleList);

    const handleClickDate = (strDate: string) => {
        setScheduleDialogOpen(strDate);
    };

    return (
        <main>
            <Calendar
                today={DateUtils.getDate()}
                sYear={sYear}
                sMonth={sMonth}
                sDate={sDate}
                schedules={schedules}
                onDateClick={handleClickDate}
                onScheduleClick={() => () => {
                }}
            />
        </main>
    );
};

export default ScheduleCalendarPage;