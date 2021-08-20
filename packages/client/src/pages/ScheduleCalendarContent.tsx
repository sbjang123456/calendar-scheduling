import React from 'react';
import { useSetRecoilState } from 'recoil';
import { scheduleDialogOpenState } from 'states/calendar';
import { Calendar } from 'components';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { sYear, sMonth, sDate } } = useRouter();

    const setScheduleDialogOpen = useSetRecoilState(scheduleDialogOpenState);

    const handleClickDate = (strDate: string) => {
        setScheduleDialogOpen(true);
    };

    return (
        <main>
            <Calendar
                today={DateUtils.getDate()}
                sYear={sYear}
                sMonth={sMonth}
                sDate={sDate}
                onDateClick={handleClickDate}
                onScheduleClick={() => () => {
                }}
            />
        </main>
    );
};

export default ScheduleCalendarPage;