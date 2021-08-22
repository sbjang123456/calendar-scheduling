import { atom, selector } from 'recoil';
import { findScheduleAll, findScheduleById } from 'service/schedule.service';

/**
 * 등록창을 열기 위한 선택한 날짜(yyyy-MM-dd)
 */
export const scheduleDialogOpenState = atom<string>({
    key: 'scheduleDialogOpenState',
    default: ''
});

// /**
//  * 현재 캘린더의 주/월 타입
//  */
// export const viewTypeState = atom<string>({
//     key: 'viewTypeState',
//     default: 'month'
// });

/**
 * router의 날짜 ([yyyy, MM, dd])
 */
export const arrDateState = atom<string[]>({
    key: 'arrDateState',
    default: []
});

/**
 * 리스트를 강제로 새로고침하기 위한 객체
 */
const forceReloadScheduleList = atom<number>({
    key: 'forceReloadScheduleList',
    default: 0
});

/**
 * async selector ( 스케줄 목록 조회 )
 */
export const scheduleListSelector = selector({
    key: 'scheduleListState',
    get: async ({ get }) => {
        get(forceReloadScheduleList);
        return findScheduleAll();
    },
    set: ({ set }) => {
        set(forceReloadScheduleList, Math.random());
    }
});

/**
 * 선택된 스케줄 ID
 */
export const selectedScheduleState = atom<number>({
    key: 'selectedScheduleState',
    default: 0
});

/**
 * 스케줄 상세조회를 강제로 리로딩 하기위한 객체
 */
const forceReloadScheduleDetail = atom<number>({
    key: 'forceReloadScheduleDetail',
    default: 0
});

/**
 * async selector (선택된 스켈줄 Id 에 의한 상세조회 객체)
 */
export const scheduleDetailSelector = selector({
    key: 'scheduleDetailSelector',
    get: async ({ get }) => {
        get(forceReloadScheduleDetail);
        return findScheduleById(get(selectedScheduleState));
    },
    set: ({ set }, newValue) => {
        set(forceReloadScheduleDetail, Math.random());
    }
});