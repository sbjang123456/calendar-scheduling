import { atom } from 'recoil';

interface confirmDialogInterface {
    open: boolean;
    title: string;
    content?: string;
    type?: string;
    action?: () => void
}

export const confirmDialogState = atom<confirmDialogInterface>({
    key: 'confirmDialogState',
    default: {
        open: false,
        title: ''
    }
});