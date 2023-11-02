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
    <Container>
      <TimeArea $DRT={DRT}>{time}</TimeArea>
      <LineArea $solid={solid} $DRT={DRT}>
        {solid ? <></> : <img src={Dot} alt="dot" />}
      </LineArea>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 63px;
  padding-left: 20px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
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
  height: 100%;
  margin-left: 14px;
  background-color: ${(props) =>
    props.$DRT ? 'var(--primary)' : 'transparent'};
`;
