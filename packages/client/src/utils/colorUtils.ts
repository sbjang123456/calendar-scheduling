/**
 * 랜덤 색상 추출
 */
export const getRandomRgb = (): string => {
    const getRandomNumber = (min: number, max: number) => {
        return ~~(Math.random() * (max - min + 1)) + min;
    };

    // 밝은 흰색 계통 색상 제외
    return `rgb(${getRandomNumber(0, 230)},${getRandomNumber(0, 230)},${getRandomNumber(0, 230)})`;
};