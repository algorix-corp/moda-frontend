import styled from "styled-components";
import Complex from "../components/Complex.tsx";

export default function Privacy() {
  return (
    <Container>
      <Title>개인정보처리방침</Title>
      <Text>이 개인정보는 이제 제껍니다.</Text>
    </Container>
  );
}

const Title = styled.h1`
  color: var(--black);
  font-size: 24px;
  font-weight: 700;
`;

const Text = styled.p`
  margin: 20px 0;
  font-size: 14px;
  font-weight: 400;
`;

const Container = styled.div`
  margin: 20px;
`;
