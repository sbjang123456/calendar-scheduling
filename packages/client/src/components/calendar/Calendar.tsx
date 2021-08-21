import './Calendar.scss';
import React from 'react';
import CalendarDay from './CalendarDay';
import CalendarDate, { CalendarDateProps } from './CalendarDate';

interface CalendarProps extends CalendarDateProps {
}

const Calendar = ({ today, sYear, sMonth, sDate, onDateClick, onScheduleClick }: CalendarProps): React.ReactElement => {
    return (
        <div role='grid' className='Calendar'>
            <CalendarDay />
            <CalendarDate
                today={today}
                sYear={sYear}
                sMonth={sMonth}
                sDate={sDate}
                onDateClick={onDateClick}
                onScheduleClick={onScheduleClick}
            />
        </div>
    );
};

export default Calendar;