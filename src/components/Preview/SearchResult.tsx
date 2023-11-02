import styled from 'styled-components';
import DRTPlace from '../Result/DRTPlace.tsx';
import NormalPlace from '../Result/NormalPlace.tsx';
import Line from '../Result/Line.tsx';

export default function SearchResult() {
  return (
    <Container>
      <Text>
        모다가 <span>최적</span>의 경로를 찾았어요.
      </Text>
      <DRTPlace
        time="15:22"
        instruction={`동아대학교 구덕캠퍼스에서\nDRT 부산 3호차 승차`}
      />
      <Line time="10분" solid={true} DRT={true} />
      <NormalPlace
        time="15:32"
        instruction={`DRT 부산 3호차 하차 후,\n부산역 승차`}
      />
      <Line time="2시간 31분" solid={true} DRT={false} />
      <DRTPlace
        time="18:11"
        instruction={`수서역 하차 후,\nDRT 강남 7호차 승차`}
      />
      <Line time="9분" solid={true} DRT={true} />
      <DRTPlace
        time="18:20"
        instruction={`DRT 강남 7호차 하차 후,\n압구정로데오역 수인분당선 도착`}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px - 94px - 185px);
  padding: 20px;
  margin-top: 15px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;

  & > span {
    color: var(--primary);
  }
`;
