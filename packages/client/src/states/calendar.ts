import { atom, selector } from 'recoil';

export const scheduleDialogOpenState = atom<string>({
    key: 'scheduleDialogOpenState',
    default: ''
});

export const arrDateState = atom<string[]>({
    key: 'arrDateState',
    default: []
});
