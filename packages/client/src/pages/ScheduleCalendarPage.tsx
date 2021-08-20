import './ScheduleCalendarPage.scss';

import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { arrDateState } from 'states/calendar';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

import ScheduleCalendarHeader from './ScheduleCalendarHeader';
import ScheduleCalendarContent from './ScheduleCalendarContent';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { viewType, sYear, sMonth, sDate }, push } = useRouter();

    const [arrDate, setArrDate] = useRecoilState(arrDateState);

    useEffect(() => {
        if (arrDate.length !== 3) {
            const arrCurrentDate = DateUtils.getDate();
            setArrDate(arrCurrentDate);
            push(`/schedule/calendar/${viewType}/${arrCurrentDate[0]}/${arrCurrentDate[1]}/${arrCurrentDate[2]}`);
        } else {
            setArrDate([sYear, sMonth, sDate]);
        }
    }, [arrDate]);

    return (
        <div className='container'>
            <ScheduleCalendarHeader />
            <ScheduleCalendarContent />
        </div>
    );
};

export default ScheduleCalendarPage;