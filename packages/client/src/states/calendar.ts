import { atom, selector } from 'recoil';
import { findScheduleAll, findScheduleById } from 'service/schedule.service';

export const scheduleDialogOpenState = atom<string>({
    key: 'scheduleDialogOpenState',
    default: ''
});

export const arrDateState = atom<string[]>({
    key: 'arrDateState',
    default: []
});

const forceReloadScheduleList = atom<number>({
    key: 'forceReloadScheduleList',
    default: 0
});

export const scheduleListSelector = selector({
    key: 'scheduleListState',
    get: async ({ get }) => {
        get(forceReloadScheduleList);
        return findScheduleAll();
    },
    set: ({ set }, newValue = 0) => {
        set(forceReloadScheduleList, Math.random());
    }
});

export const selectedScheduleState = atom<number>({
    key: 'selectedScheduleState',
    default: 0
});