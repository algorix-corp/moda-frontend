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
  description: JSX.Element;
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
      <Text>{title}</Text>

      <TwoRowsGroup>{description}</TwoRowsGroup>

      {content}
      <ErrorText>{errormessage}</ErrorText>
      <MenuGroup>
        <LeftLore disabled={disabled} onClick={leftloreclick}><Text>{leftloretext}</Text></LeftLore>
        <RightBtn disabled={disabled} onClick={rightbtnclick}>{rightbtntext}</RightBtn>
      </MenuGroup>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 100vw;
  padding: 20px;
  height: 100vh;
  grid-template-rows: auto auto auto auto auto 1fr;
`;

const Text = styled.p`
  color: var(--black);
  font-size: 24px;
  font-weight: 700;
  white-space: normal;

  & span {
    color: var(--primary);
  }
`;

const ErrorText = styled.p`
  margin-top: 10px;
  color: var(--red);
  font-size: 13px;
  font-weight: 400;
  white-space: normal;

  & span {
    color: var(--primary);
  }
`;

const TwoRowsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 60%;

  & span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const RightBtn = styled.button`
  color: var(--white);
  background-color: var(--black);
  font-size: 12px;
  font-weight: 600;
  outline: none;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  width: fit-content;
`;

const LeftLore = styled.button`
  outline: none;
  border: none;

  & p {
    font-size: 12px;
    font-weight: 400;
    text-decoration: underline;
  }
`;

const MenuGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
