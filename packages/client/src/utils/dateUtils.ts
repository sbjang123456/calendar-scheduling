/**
 * 왼쪽으로 자리수를 채우는 left pad 함수
 * @param val
 * @param fillStr
 * @param fillCnt
 */
export const lPad = (val: number | string, fillStr: string = '0', fillCnt: number = 1) => {
    if (typeof val === 'number') {
        if (val >= Math.pow(10, fillCnt)) {
            return val.toString();
        }
    } else {
        if (val.length >= fillCnt) {
            return val;
        }
    }

    return `${Array(fillCnt + 1).join(fillStr)}${val}`;
};

/**
 * 하루 24시간 30분 단위로 가져오는 함수
 */
export const getDayHours = () => {
    let times = [];
    for (let i = 0; i < 48; i++) {
        const hour = Math.floor(i / 2);
        const min = i % 2 !== 0 ? ':30' : ':00';
        const meridiem = hour >= 12 ? 'PM' : 'AM';
        const realHour = lPad(hour);
        const viewHour = `${meridiem} ${hour > 12 ? lPad(hour - 12) : lPad(hour === 0 ? 12 : hour)}`;
        times.push({
            value: realHour + min,
            text: viewHour + min
        });
    }
    return times;
};

/**
 * 날짜를 배열 형태의 년,월,일 순으로 가져오는 함수
 * @param strDate
 */
export const getDate = (strDate?: string | Date): string[] => {
    const date = strDate ? (typeof strDate === 'string' ? new Date(strDate) : strDate) : new Date();
    const year = date.getFullYear().toString();
    const month = lPad(date.getMonth() + 1);
    const day = lPad(date.getDate());
    const hours = lPad(date.getHours());
    const minutes = lPad(date.getMinutes());

    return [year, month, day, hours, minutes];
};

/**
 * 현재 시간 기준 30분 전 앞 시간 리턴
 */
export const getTodayHmSettings = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 30) {
        return [
            `${lPad(hours)}:00`,
            `${lPad(hours)}:30`
        ];
    } else {
        return [
            `${lPad(hours)}:30`,
            `${lPad(hours + 1)}:00`
        ];
    }
};

/**
 * 배열형태(년,월,일)의 날짜를 포맷팅
 * @param arrDate
 * @param delimiter
 */
export const getDateFormatting = (arrDate: string[], delimiter: string = '-') => {
    return arrDate
        .filter((e, i) => i < 3)
        .join(delimiter);
};

/**
 * 월 변경 후 년월일 배열로 반환하는 함수
 * @param arrDate
 * @param kind
 * @param isFixDate
 */
export const changeMonthYmd = (arrDate: string[], kind: 'prev' | 'next' | 'today', isFixDate?: boolean) => {
    let [changeYear, changeMonth, changeDate] = arrDate;

    if (kind === 'today') {
        return getDate();
    } else {
        if (kind === 'prev') {
            if (changeMonth === '01') {
                changeMonth = (Number(changeMonth) + 11).toString();
                changeYear = (Number(changeYear) - 1).toString();
            } else {
                changeMonth = lPad(Number(changeMonth) - 1);
            }
        } else if (kind === 'next') {
            if (changeMonth === '12') {
                changeMonth = lPad(Number(changeMonth) - 11);
                changeYear = (Number(changeYear) + 1).toString();
            } else {
                changeMonth = lPad(Number(changeMonth) + 1);
            }
        }

        if (isFixDate) {
            if (changeMonth === getDate()[1]) {
                changeDate = getDate()[2];
            } else {
                changeDate = '01';
            }
        }
    }

    return [changeYear, changeMonth, changeDate];
};

/**
 * 시작 종료 날짜 검증
 * @param startAt
 * @param endAt
 */
export const dateValidate = (startAt: string, endAt: string) => {
    const stDate = new Date(startAt);
    const edDate = new Date(endAt);
    return stDate < edDate && stDate !== edDate;
};

/**
 * 기간 내 날짜 포함여부
 * @param target
 * @param start
 * @param end
 * @param isTimeExist
 */
export const isContainsDate = (target: string, start: string, end: string, isTimeExist: boolean = false) => {
    const targetStDate = new Date(isTimeExist ? `${target}:00` : `${target} 00:00:00`);
    const targetEdDate = new Date(isTimeExist ? `${target}:30` : `${target} 23:59:59`);
    const startDate = new Date(start);
    const endDate = new Date(end);

    return !isTimeExist ? ((targetStDate <= startDate && startDate < targetEdDate) ||
        (targetStDate <= endDate && endDate < targetEdDate)) :
        targetStDate.getTime() === startDate.getTime()
        ;
};

/**
 * 해당 일짜의 월요일의 날짜를 Date객체로 리턴
 * @param arrDate
 */
export const getSundayDate = (arrDate: string[]) => {
    const date = new Date(getDateFormatting(arrDate));
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff)).toISOString().substring(0, 10);
};

/**
 * 날짜에서 일 차이 구하는 함수
 * @param targetDate
 * @param diff
 */
export const getDateFromDiff = (targetDate: string, diff: number) => {
    const date = new Date(targetDate);
    return new Date(date.setDate(date.getDate() + diff)).toISOString().substring(0, 10);
};

export const getSundayToMondayLabel = (arrDate: string[]) => {
    const mondayDate = getSundayDate(arrDate);
    const sundayDate = getDateFromDiff(mondayDate, 6);
    const [bYear, bMonth, bDate] = getDate(mondayDate);
    const [aYear, aMonth, aDate] = getDate(sundayDate);
    return `${bYear}년 ${bMonth}월 ${bDate}일 ~ ${aYear}년 ${aMonth}월 ${aDate}일`;
};

export const getWeekFromTargetDate = (arrDate: string[], kind: 'prev' | 'next') => {
    const diff = kind === 'prev' ? -7 : 7;
    const diffDate = getDateFromDiff(getDateFormatting(arrDate), diff);
    return diffDate.split('-');
};


