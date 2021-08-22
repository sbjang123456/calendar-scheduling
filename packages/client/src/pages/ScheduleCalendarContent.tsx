import React from 'react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import {
    scheduleDialogOpenState,
    scheduleListSelector,
    selectedScheduleState
} from 'states/calendar';
import { Calendar } from 'components';
import { useRouter, useLoadableContent } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { sViewType, sYear, sMonth, sDate } } = useRouter();

    const setScheduleDialogOpen = useSetRecoilState(scheduleDialogOpenState);
    const setSelectedSchedule = useSetRecoilState(selectedScheduleState);
    const scheduleList = useRecoilValueLoadable(scheduleListSelector);
    const schedules = useLoadableContent(scheduleList);

    const handleClickDate = (strDate: string) => {
        setScheduleDialogOpen(strDate);
    };

    const handleClickSchedule = (id: number) => {
        setSelectedSchedule(id);
    };

    return (
        <main>
            <Calendar
                today={DateUtils.getDate()}
                sYear={sYear}
                sMonth={sMonth}
                sDate={sDate}
                sViewType={sViewType}
                schedules={schedules}
                onDateClick={handleClickDate}
                onScheduleClick={handleClickSchedule}
            />
        </main>
    );
};

export default ScheduleCalendarPage;