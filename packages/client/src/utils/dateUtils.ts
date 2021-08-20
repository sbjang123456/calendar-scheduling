/**
 * 날짜 두자리 수로 채우는 left pad 함수
 * @param val
 */
const lPad = (val: number) => {
    if (val >= 10) {
        return val.toString();
    }

    return `0${val}`;
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


