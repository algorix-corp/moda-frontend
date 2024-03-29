export const sche: {
  id: string;
  address: string;
  time: string;
}[] = [
  {
    id: 'DRT 부산 11호차',
    address: '동아대학교 구덕캠퍼스',
    time: '15:22',
  },
  {
    id: 'DRT 강남 7호차',
    address: '수서역',
    time: '18:11',
  },
  {
    id: 'DRT 강남 1호차',
    address: '수서역',
    time: '18:01',
  },
  {
    id: 'DRT 평촌 7호차',
    address: '범계역',
    time: '18:11',
  },
  {
    id: 'DRT 부산 7호차',
    address: '부산역',
    time: '18:11',
  },
  {
    id: 'DRT 서울 10호차',
    address: '서울역',
    time: '13:32',
  },
  {
    id: 'DRT 인천 12호차',
    address: '인천공항',
    time: '18:11',
  },

];

export const saved = [0, 1];

export const places: {
  id: number;
  name: string;
  address: string;
}[] = [
  {
    id: 0,
    name: '파이브가이즈 강남',
    address: '서울특별시 서초구 강남대로 435 주류성빌딩 1층, 2층',
  },
  {
    id: 1,
    name: '하나고등학교',
    address: '서울특별시 은평구 연서로 535',
  },
  {
    id: 2,
    name: '하나은행 본점',
    address: '서울특별시 중구 을지로 35',
  },
  {
    id: 3,
    name: '하나은행 영업부지점',
    address: '서울특별시 중구 을지로 66',
  },
  {
    id: 4,
    name: '하나은행 서린지점',
    address: '서울특별시 종로구 종로 22 인주빌딩',
  },
  {
    id: 5,
    name: '하나은행 서소문지점',
    address: '서울특별시 중구 서소문로 110',
  },
];

export const DRTSummary = {
  shortenedMinutes: 46,
  hourToTravel: 2,
  minuteToTravel: 50,
  fee: 6450
}

export const Directions = [
  "동아대학교 구덕캠퍼스에서 DRT 부산 3호차 승차",
  "DRT 부산 3호차 하차 후, 부산역 승차",
  "수서역 하차 후, DRT 강남 7호차 승차",
  "DRT 강남 7호차 하차 후, 압구정로데오역 수인분당선 도착",
]
