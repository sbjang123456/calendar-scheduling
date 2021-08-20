import './ScheduleCalendarPage.scss';

import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { arrDateState } from 'states/calendar';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

import ScheduleRegisterDialog from './ScheduleRegisterDialog';
import ScheduleCalendarHeader from './ScheduleCalendarHeader';
import ScheduleCalendarContent from './ScheduleCalendarContent';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { viewType, sYear, sMonth, sDate }, push } = useRouter();

    const setArrDate = useSetRecoilState(arrDateState);

    useEffect(() => {
        if (!sYear || !sMonth || !sDate) {
            const arrCurrentDate = DateUtils.getDate();
            setArrDate(arrCurrentDate);
            push(`/schedule/calendar/${viewType}/${arrCurrentDate[0]}/${arrCurrentDate[1]}/${arrCurrentDate[2]}`);
        } else {
            setArrDate([sYear, sMonth, sDate]);
        }
    }, [sYear, sMonth, sDate]);

    return (
        <div className='container'>
            <ScheduleCalendarHeader />
            <ScheduleCalendarContent />
            <ScheduleRegisterDialog />
        </div>
    );
};

export default ScheduleCalendarPage;