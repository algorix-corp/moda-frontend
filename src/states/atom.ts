import { atom } from 'recoil';

export enum Location {
  CURRENT,
}

export const departureAtom = atom<string | Location.CURRENT | undefined>({
  key: 'departure',
  default: Location.CURRENT,
});

export const destinationAtom = atom<string | Location.CURRENT | undefined>({
  key: 'destination',
  default: undefined,
});

export const pathAtom = atom<string>({
  key: 'path',
  default: window.location.pathname,
});
