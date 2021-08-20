import React, { useState, useEffect, useMemo } from 'react';
import { getDateFormatting } from 'utils/dateUtils';
import { classNames } from 'utils';

export interface CalendarDateProps {
    today: string[];
    sYear: string;
    sMonth: string;
    sDate: string;
    onDateClick?: (event: any) => void;
    onScheduleClick?: (event: any) => void;
}

const CalendarDate = ({
                          today,
                          sYear,
                          sMonth,
                          sDate,
                          onDateClick,
                          onScheduleClick
                      }: CalendarDateProps): React.ReactElement => {

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
                    {week.map((day: any, idx: number) => {
                        const dateKey = getDateFormatting([sYear, sMonth, day.date]);
                        return (
                            <div key={dateKey}>
                                <span className={classNames('dateLabel', day.type !== 'cu' && 'notCurrentMonth')}>
                                    <span className={classNames(dateKey === getDateFormatting(today) && 'today')}>
                                        {day.date}
                                    </span>
                                </span>
                                {/*{schedules*/}
                                {/*    .filter((schedule) => schedule.date.substr(0, 10) === dateKey)*/}
                                {/*    .sort()*/}
                                {/*    .map((schedule) => {*/}
                                {/*        return (*/}
                                {/*            <div*/}
                                {/*                style={scheduleStyle}*/}
                                {/*                className={schedule.completed}*/}
                                {/*                key={schedule.desc}*/}
                                {/*                onClick={openModal}*/}
                                {/*            >*/}
                                {/*                {schedule.desc}*/}
                                {/*                <Modal isOpen={isModalOpen} close={closeModal} />*/}
                                {/*            </div>*/}
                                {/*        );*/}
                                {/*    })}*/}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
};

export default CalendarDate;