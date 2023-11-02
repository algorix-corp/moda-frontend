import styled from 'styled-components';
import DRTPlace from '../Result/DRTPlace.tsx';
import NormalPlace from '../Result/NormalPlace.tsx';
import Line from '../Result/Line.tsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchResult() {
  return (
    <Container>
      <Text>
        모다가 <span>최적</span>의 경로를 찾았어요.
      </Text>
      <DRTPlace
        time="15:30"
        instruction="동아대학교 구덕캠퍼스에서 DRT 부산 3호차"
      />
      <Line time="20분" solid={false} DRT={true} />
      <NormalPlace
        time="15:50"
        instruction="DRT 부산 3호차 하차 후,
        압구정로데오역 수인분당선 도착 "
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
  margin: 0;

  & > span {
    color: var(--primary);
  }
`;
