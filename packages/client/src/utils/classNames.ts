/**
 * 매개변수로 들어오는 css 명 합친 뒤  string 형태로 반환. (배열 요소 중 false 값은 합치지 않는다.)
 * @param arg
 */
export default (...arg: any[]) => arg.filter((e: any) => e).join(' ');