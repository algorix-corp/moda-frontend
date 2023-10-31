import CircleError from '../assets/65-circle-warning.svg';
import styled from "styled-components";

export default function ErrorCatch() {
  return (
    <Container>
      <img src={CircleError} alt="오류 아이콘"/>
      <Text>오류가 발생했어요.</Text>
      <Button onClick={() => (window.location.href = '/')}>
        메인으로 이동하기
      </Button>
    </Container>
  );
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: var(--black);
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border: none;
`;
