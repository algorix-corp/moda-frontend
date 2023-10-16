import { atom } from 'recoil';

export const counter = atom<number>({
  key: 'counter',
  default: 0,
});
