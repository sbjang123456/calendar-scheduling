import { atom, selector } from 'recoil';

export const arrDateState = atom<string[]>({
    key: 'arrDateState',
    default: []
});

// const monthState = atom<string>({
//     key: 'monthState',
//     default: ''
// });
//
// const dateState = atom<string>({
//     key: 'dateState',
//     default: ''
// });