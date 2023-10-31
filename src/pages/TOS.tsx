import styled from "styled-components";

export default function TOS() {
  return (
    <Container>
      <Title>이용 약관</Title>
      <Text>돈주면 감사합니다</Text>
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
