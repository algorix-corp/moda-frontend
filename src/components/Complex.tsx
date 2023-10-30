import styled from "styled-components";

export default function Complex({ title, description, content, leftloretext, rightbtntext, leftloreclick, rightbtnclick, selected }: {
    title: string;
    description: string;
    content: JSX.Element;
    leftloretext: string;
    rightbtntext: string;
    leftloreclick: () => void;
    rightbtnclick: () => void;
    selected: number;
}) {

    return (
        <Container>
            <Text>{title}</Text>

            <TwoRowsGroup><Text>{description}</Text></TwoRowsGroup>

            {content}

            <Spacer selected={selected}>
                <MenuGroup>
                    <LeftLore onClick={leftloreclick}><Text>{leftloretext}</Text></LeftLore>
                    <RightBtn onClick={rightbtnclick}>{rightbtntext}</RightBtn>
                </MenuGroup>
            </Spacer>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    width: 100vw;
    padding: 20px;
    height: 100vh;
    grid-template-rows: auto auto auto 1fr;
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

const TwoRowsGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    width: 60%;

    & p {
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

const Spacer = styled.div<{ selected: number }>`
    display: flex;
    margin-top: 20px;
    transition: 0.1s;
    align-items: ${(props) => (props.selected === 0 ? 'flex-end' : 'flex-start')};
`;

const MenuGroup = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;