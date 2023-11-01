import { atom } from 'recoil';

export enum Location {
  CURRENT = -1,
}

export const queriesAtom = atom<string | undefined>({
  key: 'queries',
  default: undefined,
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

interface Place {
  id: number;
  name: string;
  address: string;
  location_poi: number;
}

export const placesAtom = atom<Place[]>({
  key: 'places',
  default: [],
});

export const savedAtom = atom<Place[]>({
  key: 'saved',
  default: [],
});

export const tokenAtom = atom<string>({
  key: 'token',
  default: undefined
})

export const departureNameAtom = atom<string>({
  key: 'departureName',
  default: ''
})

export const destinationNameAtom = atom<string>({
  key: 'destinationName',
  default: ''
})
