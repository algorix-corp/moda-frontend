import styled from 'styled-components';
import Dot from '../../assets/dot.svg';

export default function Line({
  time,
  solid,
  DRT,
}: {
  time: string;
  solid: boolean;
  DRT: boolean;
}) {
  return (
    <Wrapper>
      <Container>
        <TimeArea $DRT={DRT}>{time}</TimeArea>
        <div>
          <LineArea $solid={solid} $DRT={DRT}>
            {solid ? undefined : <DotImg src={Dot} alt="dot" />}
          </LineArea>
        </div>
      </Container>
    </Wrapper>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 63px;

  top: -31.5px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  display: flex;

  z-index: -1;
`;

const Wrapper = styled.div`
  position: relative;
  width: 0;
  height: 0;
`;

const TimeArea = styled.div<{
  $DRT: boolean;
}>`
  border-radius: 4px;
  background-color: ${(props) =>
    props.$DRT ? 'var(--primary)' : 'var(--gray800)'};
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 5px;
`;

const LineArea = styled.div<{
  $DRT: boolean;
  $solid: boolean;
}>`
  width: 2px;
  height: 70px;
  margin-left: 14.5px;
  background-color: ${(props) =>
    props.$solid ? 'var(--primary)' : 'transparent'};
`;

const DotImg = styled.img`
  height: 63px;
`;
