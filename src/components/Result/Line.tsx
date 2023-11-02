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
        <TimeArea>
          <TimeBlock $DRT={DRT}>{time}</TimeBlock>
        </TimeArea>
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
  top: -30px;
  width: 100vw;
  height: 63px;

  justify-content: flex-start;
  align-items: center;
  display: flex;

  z-index: -1;
`;

const Wrapper = styled.div`
  position: relative;
  width: 0;
  height: 0;

  left: 20px;
`;

const TimeArea = styled.div`
  position: absolute;
  left: -35px;
  width: 59.5px;

  transform: translateY(-50%);
`;

const TimeBlock = styled.div<{
  $DRT: boolean;
}>`
  position: relative;
  top: 7.5px;
  left: calc(50%);
  min-width: 35px;

  display: inline-block;
  transform: translateX(-50%);

  border-radius: 6px;
  background-color: ${(props) =>
    props.$DRT ? 'var(--primary)' : 'var(--gray800)'};
  color: var(--white);
  font-size: 10px;
  font-weight: 600;
  padding: 4px 5px;

  text-align: center;
`;

const LineArea = styled.div<{
  $DRT: boolean;
  $solid: boolean;
}>`
  position: absolute;
  top: -1px;
  left: 32.5px;

  width: 2px;
  height: 70px;
  background-color: ${(props) =>
    props.$solid
      ? props.$DRT
        ? 'var(--primary)'
        : 'var(--gray800)'
      : 'transparent'};
`;

const DotImg = styled.img`
  margin-top: -2.5px;
  height: 60px;
`;
