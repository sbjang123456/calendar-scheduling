import './ScheduleCalendarPage.scss';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Button, ButtonGroup, Calendar } from 'components';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarPage = (): React.ReactElement => {
    const { query: { viewType, sYear, sMonth, sDate }, push } = useRouter();

    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [date, setDate] = useState<string>('');

    // const [year, setYear]

    const handleClickViewType = (vt: string) => (evt: any) => {
        // const target = evt.target;
        // const beforeElement = target.parentElement.querySelector('button.black');
        // beforeElement.classList.remove('black');
        // beforeElement.classList.add('white');
        // target.classList.remove('white');
        // target.classList.add('black');

        push(`/schedule/calendar/${vt}/${year}/${month}/${date}`);
    };

    const setYmd = useCallback((y: string, m: string, d: string) => {
        setYear(y);
        setMonth(m);
        setDate(d);
    }, []);

    useEffect(() => {
        if (!sYear || !sMonth || !sDate) {
            const [tYear, tMonth, tDate] = DateUtils.getDate();
            setYmd(tYear, tMonth, tDate);
            push(`/schedule/calendar/${viewType}/${tYear}/${tMonth}/${tDate}`);
        } else {
            setYmd(sYear, sMonth, sDate);
        }

    }, [sYear, sMonth, sDate]);

    return (
        <div className='container'>
            <header>
                <div className='toolbar'>
                    <Button color='white' shape='round'>오늘</Button>
                    <div className='title'>
                        <Button color='white' shape='circle'>{'<'}</Button>
                        <h2>{year}년 {month}월</h2>
                        <Button color='white' shape='circle'>{'>'}</Button>
                    </div>
                    <ButtonGroup>
                        <Button color={viewType === 'month' ? 'black' : 'white'}
                                onClick={handleClickViewType('month')}>월</Button>
                        <Button color={viewType === 'week' ? 'black' : 'white'}
                                onClick={handleClickViewType('week')}>주</Button>
                    </ButtonGroup>
                </div>
            </header>
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
        </div>
    );
};

export default ScheduleCalendarPage;