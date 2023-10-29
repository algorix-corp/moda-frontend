import { styled } from 'styled-components';
import SearchSVG from '../assets/18-search.svg';
import { useRecoilState } from 'recoil';
import {
  Location,
  destinationAtom,
  departureAtom,
  pathAtom,
} from '../states/atom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [departure, setDeparture] = useRecoilState(departureAtom);
  const [destination, setDestination] = useRecoilState(destinationAtom);
  const [path, setPath] = useRecoilState(pathAtom);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (path === '/') {
      setDeparture(undefined);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.querySelector('.departure')!.value = null;
      setSelected(0);
    }
  }, [path, setDeparture]);

  return (
    <Container isMain={path === '/'}>
      <div>
        <SearchIcon src={SearchSVG} isMain={path === '/'} />
        {path === '/' ? null : (
          <ToolTip selected={selected === 1}>출발지</ToolTip>
        )}
        <Input
          placeholder="오늘은 어디를 가고 싶으신가요?"
          type="text"
          className="departure"
          isMain={path === '/'}
          selected={selected === 1}
          value={departure === Location.CURRENT ? '내 현재 위치' : departure}
          onChange={(e) => setDeparture(e.target.value)}
          onFocus={() => {
            navigate('/search');
            setPath('/search');
            setSelected(1);
          }}
          onBlur={() => {
            if (
              departure !== Location.CURRENT &&
              (departure === undefined ||
                departure.replaceAll(' ', '') === '') &&
              path !== '/'
            ) {
              setDeparture(Location.CURRENT);
            }
          }}
        ></Input>
      </div>
      <div>
        <ToolTip selected={selected === 2}>목적지</ToolTip>
        <Input
          placeholder="목적지를 입력하세요."
          type="text"
          isMain={path === '/'}
          selected={selected === 2}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={() => setSelected(2)}
        ></Input>
      </div>
    </Container>
  );
}

const Container = styled.div<{
  isMain: boolean;
}>`
  position: relative;
  width: calc(100vw - 40px);
  height: ${(props) => (props.isMain ? 50 : 100)}px;
  left: 20px;

  display: flex;
  /* align-items: */
  overflow: hidden;

  border-radius: 25px;
  border: 1px solid var(--gray200);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);

  transition: height 150ms ease;

  & div {
    position: absolute;
    width: 100%;
    height: 50px;
  }

  & div:first-child {
    border-bottom: 1px solid var(--gray200);
  }

  & div:last-child {
    top: 49px;
  }
`;

const SearchIcon = styled.img<{
  isMain: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 20px;

  transform: translate(${(props) => (props.isMain ? 0 : -58)}px, -50%);

  transition: transform 150ms ease;
`;

const Input = styled.input<{
  isMain: boolean;
  selected: boolean;
}>`
  position: absolute;
  left: 20px;
  width: calc(100% - 40px);
  height: 48px;

  padding-top: ${(props) => (props.selected && !props.isMain ? 17 : 0)}px;
  padding-left: ${(props) => (props.isMain ? 28 : 0)}px;

  color: var(--black);
  background-color: #ffffff00;
  font-size: 16px;

  outline: none;
  border: none;

  -webkit-tap-highlight-color: transparent;

  transition: padding 150ms ease;

  &::placeholder {
    color: var(--gray400);

    opacity: ${(props) => (props.selected ? 0 : 1)};
    transition: opacity 200ms ease;
  }
`;

const ToolTip = styled.p<{
  selected: boolean;
}>`
  position: absolute;
  top: 7px;
  left: 20px;

  color: var(--gray400);
  font-size: 12px;

  opacity: ${(props) => (props.selected ? 1 : 0)};
  transition: opacity 200ms ease;
`;
