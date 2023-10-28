import styled from 'styled-components';
import MapSVG from '../assets/24-map.svg';
import SettingSVG from '../assets/24-setting.svg';

export default function Navigator() {
  return (
    <Container>
      <Button>
        <Icon src={MapSVG} />
        <Text>메인</Text>
      </Button>
      <Button>
        <Icon src={SettingSVG} />
        <Text>설정</Text>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 393px;
  height: 60px;
  bottom: 34px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  border-top: 1px solid var(--gray100);
  background-color: var(--white);
`;

const Button = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
`;

const Icon = styled.img`
  position: relative;
  top: 1px;
  left: 50%;

  transform: translateX(-50%);
`;

const Text = styled.p`
  color: var(--gray400);
  text-align: center;
  font-size: 11px;
`;
