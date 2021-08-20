import React from 'react';
import { useRecoilState } from 'recoil';
import { arrDateState } from 'states/calendar';
import { Button, ButtonGroup } from 'components';
import { useRouter } from 'hooks';
import { DateUtils } from 'utils';

const ScheduleCalendarHeader = (): React.ReactElement => {
    const { query: { viewType }, push } = useRouter();

    const [[year, month, date], setArrDate] = useRecoilState(arrDateState);

    const handleClickCalendarChange = (kind: 'prev' | 'next' | 'today') => () => {
        const [cYear, cMonth, cDate] = DateUtils.changeMonthYmd([year, month, date], kind);
        setArrDate([cYear, cMonth, cDate]);
        push(`/schedule/calendar/${viewType}/${cYear}/${cMonth}/${cDate}`);
    };

    const handleClickViewType = (vt: string) => () => {
        push(`/schedule/calendar/${vt}/${year}/${month}/${date}`);
    };

    return (
        <header>
            <div className='toolbar'>
                <Button color='white' shape='round' onClick={handleClickCalendarChange('today')}>오늘</Button>
                <div className='title'>
                    <Button color='white' shape='circle' onClick={handleClickCalendarChange('prev')}>{'<'}</Button>
                    <h2>{year}년 {month}월</h2>
                    <Button color='white' shape='circle' onClick={handleClickCalendarChange('next')}>{'>'}</Button>
                </div>
                <ButtonGroup>
                    <Button color={viewType === 'month' ? 'black' : 'white'}
                            onClick={handleClickViewType('month')}>월</Button>
                    <Button color={viewType === 'week' ? 'black' : 'white'}
                            onClick={handleClickViewType('week')}>주</Button>
                </ButtonGroup>
            </div>
        </header>
    );
};

export default ScheduleCalendarHeader;