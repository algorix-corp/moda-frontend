import styled from 'styled-components';
import DRTIcon from '../../assets/drtplace.svg';

export default function DRTPlace({
  time,
  instruction,
}: {
  time: string;
  instruction: string;
}) {
  return (
    <Container>
      <TimeText>{time}</TimeText>
      <Icon src={DRTIcon} alt="DRT" />
      <InstructionText>{instruction}</InstructionText>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 75px;
  padding-left: 23px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const TimeText = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  color: var(--gray400);
`;

const InstructionText = styled.p`
  font-size: 15px;
  font-weight: 400;
  margin: 0;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 7px;
  margin-right: 10px;
`;
