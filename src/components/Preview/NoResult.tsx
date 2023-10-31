import styled from "styled-components";
import CircleError from "../../assets/65-circle-warning.svg";

export default function NoResult() {
  return (
    <Container>
      <img src={CircleError} alt="검색 결과 없음"/>
      <Text>적절한 경로를 찾지 못했어요.</Text>
      <SmallText>출발지 혹은 목적지를 변경한 후<br/>다시 시도해보세요.</SmallText>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px - 94px);
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

const SmallText = styled.p`
  color: var(--gray400);
  font-size: 12px;
  text-align: center;
  font-weight: 400;
  margin: 0;
`;
