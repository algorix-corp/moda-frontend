import styled from "styled-components";

export default function Searching() {
  return (
    <Container>
      <SmallText>경로를 검색하는 중이에요.</SmallText>
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

const SmallText = styled.p`
  color: var(--gray400);
  font-size: 12px;
  text-align: center;
  font-weight: 400;
  margin: 0;
`;
