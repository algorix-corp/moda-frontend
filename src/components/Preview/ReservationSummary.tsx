import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ReservationSummary() {
  const navigate = useNavigate();
  const onReserveClick = () => {
    navigate('/reservation');
  }
  return (
    <Container>
      <TimeArea>
        <SingleArea>
          <TimeSavedArea>
            <SmallText>예상 소요 시간</SmallText>
            <TimeSaved>3000분 단축</TimeSaved>
          </TimeSavedArea>
          <NumberArea>
            <NumberText>1</NumberText>
            <TimeText>시간</TimeText>
            <NumberText>30</NumberText>
            <TimeText>분</TimeText>
          </NumberArea>
        </SingleArea>
        <SingleArea>
          <TimeSavedArea>
            <SmallText>총 DRT 비용</SmallText>
          </TimeSavedArea>
          <NumberArea>
            <NumberText>6,450</NumberText>
            <TimeText>원</TimeText>
          </NumberArea>
        </SingleArea>
      </TimeArea>
      <Button onClick={onReserveClick}>DRT N개 예약하기</Button>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 185px;
  border-radius: 25px 25px 0 0;
  background: var(--white);
  box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 20px;
`;

const TimeArea = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: var(--primary);
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border: none;
`;

const SingleArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TimeSavedArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SmallText = styled.p`
  color: var(--gray400);
  font-size: 12px;
  font-weight: 400;
  margin: 0;
`;

const TimeSaved = styled.p`
  margin: 0 0 0 6px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--gray800);
  color: var(--white);
  font-size: 10px;
  font-weight: 600;
  text-align: center;
`;

const TimeText = styled.p`
  color: var(--black);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const NumberText = styled.p`
  color: var(--black);
  font-size: 26px;
  font-weight: 600;
  margin: 0;
`;

const NumberArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
`;
