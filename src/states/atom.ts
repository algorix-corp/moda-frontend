import { atom } from 'recoil';
import { saved, schedules } from '../dummy.ts';

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

interface Token {
  id: string;
  phone_number: string;
  username: string;
  card_number: string;
}

export const tokenAtom = atom<Token|undefined>({
  key: 'token',
  default: undefined
})
