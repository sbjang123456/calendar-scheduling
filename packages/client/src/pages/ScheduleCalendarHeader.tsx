import React, { useMemo } from 'react';
import { Button, ButtonGroup } from 'components';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarHeader = (): React.ReactElement => {
    const { query: { sViewType, sYear, sMonth, sDate }, push } = useRouter();

    const handleClickCalendarChange = (kind: 'prev' | 'next' | 'today') => () => {
        const [cYear, cMonth, cDate] = DateUtils.changeMonthYmd([sYear, sMonth, sDate], kind, true);
        push(`/schedule/calendar/${sViewType}/${cYear}/${cMonth}/${cDate}`);
    };

    const handleClickViewType = (vt: string) => () => {
        push(`/schedule/calendar/${vt}/${sYear}/${sMonth}/${sDate}`);
    };

    const title = useMemo(() => {
        return sViewType === 'month' ?
            `${sYear}년 ${sMonth}월` :
            DateUtils.getMondayToSundayLabel([sYear, sMonth, sDate]);
    }, [sViewType, sYear, sMonth, sDate]);

    return (
        <header>
            <div className='toolbar'>
                <Button color='white' shape='round' onClick={handleClickCalendarChange('today')}>오늘</Button>
                <div className='title'>
                    <Button color='white' shape='circle' onClick={handleClickCalendarChange('prev')}>{'<'}</Button>
                    <h2>{title}</h2>
                    <Button color='white' shape='circle' onClick={handleClickCalendarChange('next')}>{'>'}</Button>
                </div>
                <ButtonGroup>
                    <Button color={sViewType === 'month' ? 'black' : 'white'}
                            onClick={handleClickViewType('month')}>월</Button>
                    <Button color={sViewType === 'week' ? 'black' : 'white'}
                            onClick={handleClickViewType('week')}>주</Button>
                </ButtonGroup>
            </div>
        </header>
    );
};

export default ScheduleCalendarHeader;