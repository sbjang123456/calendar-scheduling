import { atom } from 'recoil';

export const confirmDialogState = atom({
    key: 'confirmDialogState',
    default: {
        open: false,
        title: ''
    }
});