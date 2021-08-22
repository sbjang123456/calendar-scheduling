import React, { useMemo } from 'react';
import { CalendarProps } from './Calendar';
import { classNames, DateUtils, ColorUtils } from 'utils';

const CalendarWeek = ({
                          today,
                          sYear,
                          sMonth,
                          sDate,
                          schedules,
                          onDateClick,
                          onScheduleClick
                      }: CalendarProps): React.ReactElement => {

    const handleClickDate = (dateFormatting: string) => () => {
        onDateClick && onDateClick(dateFormatting, true);
    };

    const handleClickSchedule = (id: number) => (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        onScheduleClick && onScheduleClick(id);
    };

    const days = useMemo(() => {
        const dayOfWeek = ['', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const sunday = DateUtils.getSundayDate([sYear, sMonth, sDate]);
        return dayOfWeek.map((day, idx) => {
            return {
                day,
                date: idx ? DateUtils.getDateFromDiff(sunday, idx - 1) : ''
            };
        });
    }, [sYear, sMonth, sDate]);

    const calendarDays = useMemo(() => {
        const sunday = DateUtils.getSundayDate([sYear, sMonth, sDate]);
        const times = DateUtils.getDayHours();
        const calendarDays = [];
        for (const time of times) {
            const _week = [];
            _week.push(time);
            for (let i = 0; i < 7; i++) {
                _week.push({
                    ...time,
                    date: DateUtils.getDateFromDiff(sunday, i)
                });
            }
            calendarDays.push(_week);
        }

        return calendarDays;
    }, [sYear, sMonth, sDate]);
    console.log(calendarDays);
    return (
        <>
            <div role='row' className='Day Day-Week-Root'>
                {
                    days.map((day, idx) => (
                        <div key={idx} role='columnheader' className='Day-Week'>
                            <div>
                                {day.day}
                            </div>
                            <div
                                className={classNames(day.date === DateUtils.getDateFormatting(today) && 'Day-Week-Date')}>
                                {day.date.split('-')[2]}
                            </div>
                        </div>
                    ))
                }
            </div>
            {calendarDays.map((weekDays: any[], idxWeek) => (
                <div key={idxWeek} role='row' className='Date Date-Week-Root'>
                    {weekDays.map((day: any, idx) => {
                        // const dateKey = getDateFormattingByType([sYear, sMonth, lPad(day.date)], day.type);
                        const dateKey = `${day.date} ${day.value}`;
                        console.log(dateKey);
                        return (
                            <div key={idx} className='Date-Week' onClick={handleClickDate(dateKey)}>
                                {idx === 0 ? (
                                    <span className={classNames('dateLabel')}>
                                        <span>
                                            {idxWeek % 2 === 0 && day.text}
                                        </span>
                                    </span>
                                ) : (
                                    <>
                                        {(schedules ?? [])
                                            .filter((schedule) => (
                                                DateUtils.isContainsDate(dateKey, schedule.startAt, schedule.endAt, true)
                                            ))
                                            .sort()
                                            .map((schedule) => {
                                                return (
                                                    <div
                                                        className='calendar-schedule'
                                                        key={schedule.id}
                                                        onClick={handleClickSchedule(schedule.id)}
                                                        style={{
                                                            backgroundColor: ColorUtils.getRandomRgb()
                                                        }}
                                                    >
                                                        {schedule.title}
                                                    </div>
                                                );
                                            })}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
};

export default CalendarWeek;