import styled from 'styled-components';

export default function Complex({
  title,
  description,
  content,
  errormessage,
  leftloretext,
  rightbtntext,
  leftloreclick,
  rightbtnclick,
  disabled,
}: {
  title: string;
  description: string;
  content: JSX.Element;
  leftloretext: string;
  rightbtntext: string;
  errormessage?: string;
  leftloreclick: () => void;
  rightbtnclick: () => void;
  disabled: boolean;
}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>

      {content}

      <ErrorText>{errormessage}</ErrorText>
      <MenuGroup>
        <LeftLore disabled={disabled} onClick={leftloreclick}>
          <Title>{leftloretext}</Title>
        </LeftLore>
        <RightBtn disabled={disabled} onClick={rightbtnclick}>
          {rightbtntext}
        </RightBtn>
      </MenuGroup>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  padding: 0 20px 0 20px;
  height: 100vh;
  grid-template-rows: auto auto auto auto auto 1fr;
`;

const Title = styled.p`
  margin-top: 40px;

  color: var(--black);
  font-size: 26px;
  font-weight: 700;
  white-space: normal;
`;

const Description = styled.p`
  margin-top: 15px;

  white-space: pre;

  color: var(--black);
  font-size: 16px;
`;

const ErrorText = styled.p`
  margin-top: 10px;
  color: var(--red);
  font-size: 14px;
  font-weight: 400;
  white-space: normal;

  & span {
    color: var(--primary);
  }
`;

const MenuGroup = styled.div`
  margin-top: 15px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightBtn = styled.button`
  color: var(--white);
  background-color: var(--black);
  font-size: 14px;
  outline: none;
  border: none;
  padding: 12px 22px;
  border-radius: 22px;
  width: fit-content;
`;

const LeftLore = styled.button`
  position: relative;
  top: 50%;
  height: 100%;

  transform: translateY(-50%);

  outline: none;
  background-color: transparent;
  border: none;

  & p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
  }
`;
