import { atom } from 'recoil';
import { saved, schedules } from '../dummy';

export enum Location {
  CURRENT = -1,
}

export const queriesAtom = atom<{
  departure: string;
  destination: string;
}>({
  key: 'queries',
  default: {
    departure: '',
    destination: '',
  },
});

export const selectedAtom = atom<number>({
  key: 'selected',
  default: 0,
});

export const departureAtom = atom<number | undefined>({
  key: 'departure',
  default: Location.CURRENT,
});

export const destinationAtom = atom<number | undefined>({
  key: 'destination',
  default: undefined,
});

export const pathAtom = atom<string>({
  key: 'path',
  default: window.location.pathname,
});

export const scheduleAtom = atom<
  {
    id: string;
    address: string;
    time: string;
  }[]
>({
  key: 'schedule',
  default: schedules,
});

export const savedAtom = atom<number[]>({
  key: 'saved',
  default: saved,
});
