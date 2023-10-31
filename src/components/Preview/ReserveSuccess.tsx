import styled from "styled-components";
import ThumbsUp from "../../assets/hand-thumbsup.svg";

export default function ReserveSuccess() {
  return (
    <Container>
      <img src={ThumbsUp} alt="예약 성공"/>
      <Text>예약이 성공적으로<br/>완료되었어요!</Text>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px - 94px - 185px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin: 10px 0;
`;
