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
 * 날짜를 배열 형태의 년,월,일 순으로 가져오는 함수
 * @param strDate
 */
export const getDate = (strDate?: string): string[] => {
    const date = strDate ? new Date(strDate) : new Date();
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
 * @param fixDate
 */
export const changeMonthYmd = (arrDate: string[], kind: 'prev' | 'next' | 'today', fixDate?: string) => {
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

        if (fixDate) {
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


