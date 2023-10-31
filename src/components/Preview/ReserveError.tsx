import styled from "styled-components";
import TriangleError from "../../assets/triangle-error.svg";

export default function ReserveError() {
  return (
    <Container>
      <img src={TriangleError} alt="예약 실패"/>
      <Text>예약 처리 중<br/>오류가 발생했어요.</Text>
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
