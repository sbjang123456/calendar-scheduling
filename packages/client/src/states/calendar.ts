import { atom, selector } from 'recoil';

export const scheduleDialogOpenState = atom<boolean>({
    key: 'scheduleDialogOpenState',
    default: false
});

export const arrDateState = atom<string[]>({
    key: 'arrDateState',
    default: []
});
