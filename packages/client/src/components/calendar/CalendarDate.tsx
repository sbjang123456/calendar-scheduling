import React, { useMemo, useCallback } from 'react';
import { lPad, getDateFormatting, changeMonthYmd } from 'utils/dateUtils';
import { classNames } from 'utils';

export interface CalendarDateProps {
    today: string[];
    sYear: string;
    sMonth: string;
    sDate: string;
    schedules: any[];
    onDateClick?: any;
    onScheduleClick?: (event: any) => void;
}

const CalendarDate = ({
                          today,
                          sYear,
                          sMonth,
                          sDate,
                          schedules,
                          onDateClick,
                          onScheduleClick
                      }: CalendarDateProps): React.ReactElement => {

    const handleClickDate = (dateFormatting: string) => () => {
        onDateClick(dateFormatting);
    };

    const getDateFormattingByType = useCallback((arrDate: string[], type: string) => {
        return getDateFormatting(
            type === 'ne' ? changeMonthYmd(arrDate, 'next') :
                type === 'be' ? changeMonthYmd(arrDate, 'prev') : arrDate
        );
    }, []);

    const calendarDays = useMemo(() => {
        const year = Number(sYear);
        const month = Number(Number(sMonth) - 1);
        // const date = Number(sDate);
        const firstDayOfCurrentMonth = new Date(year, month, 1).getDay();
        const endDateOfBeforeMonth = new Date(year, month, 0).getDate();
        const endDateOfCurrentMonth = new Date(year, month + 1, 0).getDate();
        const calendarDays = [];

        let beforeMonthDate = endDateOfBeforeMonth - firstDayOfCurrentMonth + 1;
        let currentDate = 1;
        let nextMonthDate = 1;
        for (let i = 0; i < 6; i++) {
            const _days = [];
            for (let j = 0; j < 7; j++) {
                if (currentDate > endDateOfCurrentMonth) {
                    _days.push({ type: 'ne', date: nextMonthDate });
                    nextMonthDate++;
                } else if (firstDayOfCurrentMonth > j && i === 0) {
                    _days.push({ type: 'be', date: beforeMonthDate });
                    beforeMonthDate++;
                } else {
                    _days.push({ type: 'cu', date: currentDate });
                    currentDate++;
                }
            }
            calendarDays.push(_days);
        }
        return calendarDays;
    }, [sYear, sMonth, sDate]);
    return (
        <>
            {calendarDays.map((week: any, idxWeek) => (
                <div key={idxWeek} role='row' className='Date'>
                    {week.map((day: any) => {
                        const dateKey = getDateFormattingByType([sYear, sMonth, lPad(day.date)], day.type);
                        return (
                            <div key={dateKey} onClick={handleClickDate(dateKey)}>
                                <span className={classNames('dateLabel', day.type !== 'cu' && 'notCurrentMonth')}>
                                    <span className={classNames(dateKey === getDateFormatting(today) && 'today')}>
                                        {day.date}
                                    </span>
                                </span>
                                {schedules
                                    .filter((schedule) => (
                                        schedule.startAt.substr(0, 10) <= dateKey &&
                                        schedule.endAt.substr(0, 10) >= dateKey
                                    ))
                                    .sort()
                                    .map((schedule) => {
                                        return (
                                            <div
                                                className='calendar-schedule'
                                                key={schedule.id}
                                                // onClick={openModal}
                                            >
                                                {schedule.title}
                                            </div>
                                        );
                                    })}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
};

export default CalendarDate;