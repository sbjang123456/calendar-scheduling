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
    let year = date.getFullYear().toString();
    let month = lPad(date.getMonth() + 1);
    let day = lPad(date.getDate());
    return [year, month, day];
};

/**
 * 배열형태(년,월,일)의 날짜를 포맷팅
 * @param arrDate
 * @param delimiter
 */
export const getDateFormatting = (arrDate: string[], delimiter: string = '-') => {
    return arrDate.join(delimiter);
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


