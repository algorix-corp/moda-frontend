import styled from 'styled-components';
import DefaultIcon from '../../assets/defaultplace.svg';

export default function NormalPlace({
  time,
  instruction,
}: {
  time: string;
  instruction: string;
}) {
  return (
    <Container>
      <TimeText>{time}</TimeText>
      <Icon src={DefaultIcon} alt="DRT" />
      <InstructionText>{instruction}</InstructionText>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  left: 10px;
  width: 100vw;
  height: 75px;

  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const TimeText = styled.p`
  position: relative;
  left: -10px;

  font-size: 12px;
  font-weight: 400;
  margin: 0;
  color: var(--gray400);
`;

const InstructionText = styled.p`
  position: absolute;
  left: 61px;

  font-size: 15px;
  font-weight: 400;
  margin: 0;

  width: calc(100vw - 121px);

  word-wrap: break-word; /* IE 5.5-7 */
  white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
  white-space: pre-wrap; /* current browsers */
`;

const Icon = styled.img`
  position: absolute;
  left: 37px;

  width: 14px;
  height: 14px;
`;
