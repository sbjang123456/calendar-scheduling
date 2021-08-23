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

    const handleClickDate = (dateFormatting: string, notIdx: number) => () => {
        if (onDateClick && notIdx !== 0) {
            onDateClick(dateFormatting, true);
        }
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
        calendarDays.push(times);
        for (let i = 0; i < 7; i++) {
            const _week = [];
            for (const time of times) {
                _week.push({
                    ...time,
                    date: DateUtils.getDateFromDiff(sunday, i)
                });
            }
            calendarDays.push(_week);
        }

        return calendarDays;
    }, [sYear, sMonth, sDate]);

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
            <div role='row' className='Day Day-Week-Root Day-Week-Content'>
                {calendarDays.map((weekDays: any[], idxDate) => (
                    <div className='Day-Week Day-Week-Content'>
                        {weekDays.map((day: any, idx) => (
                            <div key={idx} className='Day-Week-Time'
                                 onClick={handleClickDate(`${day.date} ${day.value}`, idxDate)}>
                                {idxDate === 0 ? (
                                    <div className='Day-Week-Time-Label'>
                                        {idx % 2 === 0 && day.text}
                                    </div>
                                ) : (
                                    <>
                                        {(schedules ?? [])
                                            .filter((schedule) => (
                                                DateUtils.isContainsDate(`${day.date} ${day.value}`, schedule.startAt, schedule.endAt, true)
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
                                                            height: `calc(${DateUtils.getMinutesBySubtractTime(schedule.startAt, schedule.endAt) / 30 * 100}% - 10px)`
                                                        }}
                                                    >
                                                        {schedule.title}
                                                    </div>
                                                );
                                            })}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default CalendarWeek;