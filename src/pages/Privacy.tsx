import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <Container>
      <Title>
        {
          location.pathname.startsWith('/setting') ? (
            <Link to="/settings">{'<'}</Link>
          ) : (
            <Link to="/">{'<'}</Link>
          )
        }
        개인정보처리방침
      </Title>
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
  & a {
    margin-right: 10px;
    font-family: 'SUIT Variable', sans-serif;
    font-weight: 700;
    color: var(--black);
    text-decoration: none;
  }
`;
