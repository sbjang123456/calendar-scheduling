import './Calendar.scss';
import React from 'react';
import CalendarDay from './CalendarDay';
import CalendarDate from './CalendarDate';
import CalendarWeek from './CalendarWeek';

export interface CalendarProps {
    today: string[];
    sYear: string;
    sMonth: string;
    sDate: string;
    sViewType?: string;
    schedules: any[];
    onDateClick?: (dateFormatting: string, isTime?: boolean) => void;
    onScheduleClick?: (id: number) => void;
}

const Calendar = ({
                      today,
                      sYear,
                      sMonth,
                      sDate,
                      sViewType,
                      schedules,
                      onDateClick,
                      onScheduleClick
                  }: CalendarProps): React.ReactElement => {
    return (
        <div role='grid' className='Calendar'>
            {sViewType === 'month' ? (
                <>
                    <CalendarDay />
                    <CalendarDate
                        today={today}
                        sYear={sYear}
                        sMonth={sMonth}
                        sDate={sDate}
                        schedules={schedules}
                        onDateClick={onDateClick}
                        onScheduleClick={onScheduleClick}
                    />
                </>
            ): (
                <CalendarWeek
                    today={today}
                    sYear={sYear}
                    sMonth={sMonth}
                    sDate={sDate}
                    schedules={schedules}
                    onDateClick={onDateClick}
                    onScheduleClick={onScheduleClick}
                />
            )}

        </div>
    );
};

export default Calendar;