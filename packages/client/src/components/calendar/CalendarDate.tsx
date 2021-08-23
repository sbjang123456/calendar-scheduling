import React, { useMemo } from 'react';
import { CalendarProps } from './Calendar';
import { classNames, ColorUtils, DateUtils } from 'utils';

const CalendarDate = ({
                          today,
                          sYear,
                          sMonth,
                          sDate,
                          schedules,
                          onDateClick,
                          onScheduleClick
                      }: CalendarProps): React.ReactElement => {

    const handleClickDate = (dateFormatting: string) => () => {
        onDateClick && onDateClick(dateFormatting);
    };

    const handleClickSchedule = (id: number) => (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        onScheduleClick && onScheduleClick(id);
    };

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
                    _days.push(
                        DateUtils.getDateFormatting(DateUtils.changeMonthYmd([sYear, sMonth, DateUtils.lPad(nextMonthDate)], 'next'))
                    );
                    nextMonthDate++;
                } else if (firstDayOfCurrentMonth > j && i === 0) {
                    _days.push(
                        DateUtils.getDateFormatting(DateUtils.changeMonthYmd([sYear, sMonth, DateUtils.lPad(beforeMonthDate)], 'prev'))
                    );
                    beforeMonthDate++;
                } else {
                    _days.push(`${sYear}-${sMonth}-${DateUtils.lPad(currentDate)}`);

                    currentDate++;
                }
            }
            calendarDays.push(_days);
        }
        return calendarDays;
    }, [sYear, sMonth, sDate]);

    return (
        <>
            {calendarDays.map((week: any[], idxWeek) => (
                <div key={idxWeek} role='row' className='Date'>
                    {week.map((day: string, idx) => {
                        return (
                            <div key={day} onClick={handleClickDate(day)}>
                                <span
                                    className={classNames('dateLabel', day.split('-')[1] !== sMonth && 'notCurrentMonth')}>
                                    <span
                                        className={classNames(day === DateUtils.getDateFormatting(today) && 'today')}>
                                        {new Date(day).getDate()}
                                    </span>
                                </span>
                                {(schedules ?? [])
                                    .filter((schedule) => (
                                        DateUtils.isContainsDate(day, schedule.startAt, schedule.endAt)
                                    ))
                                    .sort()
                                    .map((schedule) => {
                                        return (
                                            <div
                                                className='calendar-schedule'
                                                key={schedule.id}
                                                onClick={handleClickSchedule(schedule.id)}
                                                style={{
                                                    backgroundColor: ColorUtils.getRandomRgb(),
                                                }}
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