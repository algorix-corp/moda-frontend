import { styled } from 'styled-components';
import SearchSVG from '../assets/18-search.svg';

export default function SearchBar() {
  return (
    <Container>
      <SearchIcon src={SearchSVG} />
      <Input placeholder="오늘은 어디를 가고 싶으신가요?"></Input>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: calc(100vw - 40px);
  height: 50px;
  left: 20px;

  display: flex;
  align-items: center;

  border-radius: 25px;
  border: 1px solid var(--gray200);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 20px;
`;

const Input = styled.input`
  position: absolute;
  width: calc(100% - 68px);
  height: 50px;
  left: 48px;

  color: var(--black);
  background-color: #ffffff00;
  font-size: 15px;

  outline: none;
  border: none;

  &::placeholder {
    color: var(--gray400);
  }
`;
