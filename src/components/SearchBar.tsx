import {styled} from 'styled-components';
import SearchSVG from '../assets/18-search.svg';
import {useRecoilState} from 'recoil';
import {departureAtom, destinationAtom, Location, pathAtom, queriesAtom, selectedAtom, tokenAtom} from '../states/atom';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {places} from '../dummy';

export default function SearchBar() {
  const [queries, setQueries] = useRecoilState(queriesAtom);
  const [departure, setDeparture] = useRecoilState(departureAtom);
  const [destination, setDestination] = useRecoilState(destinationAtom);
  const [path, setPath] = useRecoilState(pathAtom);
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const navigate = useNavigate();
  const [token] = useRecoilState(tokenAtom);

  useEffect(() => {
    if (path === '/') {
      setDeparture(undefined);
      setDestination(undefined);

      // @ts-ignore
      document.querySelector('.departure')!.value = null;
      // @ts-ignore
      document.querySelector('.destination')!.value = null;
      setSelected(0);
    } else if (
      path === '/search' &&
      departure !== undefined &&
      destination !== undefined
    ) {
      navigate('/preview');
      setPath('/preview');
    }
    /* ===========DISABLE ONCE LOGIN DONE===========
    if (token===undefined) {
      navigate('/login');
    }
    */
  }, [
    departure,
    destination,
    navigate,
    path,
    setDeparture,
    setDestination,
    setPath,
    setSelected,
  ]);

  useEffect(() => {
    if (path !== '/' && selected === 0) {
      if (departure === undefined) {
        setDeparture(Location.CURRENT);

        // @ts-ignore
        document.querySelector('.departure')!.value = '내 현재 위치';
      } else {
        // @ts-ignore
        document.querySelector('.departure')!.value =
          departure === Location.CURRENT
            ? '내 현재 위치'
            : places.find((place) => place.id === departure)?.name;
      }
    }
  }, [departure, selected]);

  useEffect(() => {
    if (selected === 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (destination === undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector('.destination')!.value = '';
      } else if (destination === Location.CURRENT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector('.destination')!.value = '내 현재 위치';
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.querySelector('.destination')!.value = places.find((place) => place.id === destination)?.name;
      }
    }
  }, [destination, selected]);

  return (
    <div>
      <Container $isMain={path === '/'}>
        <div>
          <SearchIcon src={SearchSVG} $isMain={path === '/'}/>
          {path === '/' ? null : (
            <ToolTip $selected={selected === 1}>출발지</ToolTip>
          )}
          <Input
            placeholder="오늘은 어디를 가고 싶으신가요?"
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="departure"
            $isMain={path === '/'}
            $selected={selected === 1}
            onChange={(e) =>
              setQueries({
                ...queries,
                departure: e.target.value,
              })
            }
            onFocus={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.querySelector('.departure')!.value = '';
              setQueries({
                ...queries,
                destination: '',
              });
              setDeparture(undefined);

              navigate('/search');
              setPath('/search');

              setSelected(1);
            }}
            onBlur={() => {
              if (path !== '/') {
                setSelected(0);
                setQueries({
                  ...queries,
                  destination: '',
                });
              }
            }}
          ></Input>
        </div>
        <div>
          <ToolTip $selected={selected === 2}>목적지</ToolTip>
          <Input
            placeholder="목적지를 입력하세요."
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="destination"
            $isMain={path === '/'}
            $selected={selected === 2}
            onChange={(e) =>
              setQueries({
                ...queries,
                destination: e.target.value,
              })
            }
            onFocus={() => {
              if (path === '/preview') {
                setQueries({
                  ...queries,
                  destination: '',
                });
                setDestination(undefined);
                // @ts-ignore
                document.querySelector('.destination')!.value = '';

                navigate('/search');
                setPath('/search');
              }

              setSelected(2);
            }}
            onBlur={() => {
              setSelected(0);
              setQueries({
                ...queries,
                destination: '',
              });
            }}
          ></Input>
        </div>
      </Container>
      <MockContainer $isMain={path === '/'}/>
    </div>
  );
}

const MockContainer = styled.div<{
  $isMain: boolean;
}>`
  width: 100vw;
  height: ${(props) => (props.$isMain ? 50 : 100)}px;

  transition: height 150ms ease;
`;

const Container = styled.div<{
  $isMain: boolean;
}>`
  position: fixed;
  width: calc(100vw - 40px);
  height: ${(props) => (props.$isMain ? 50 : 100)}px;
  left: 20px;

  display: flex;
  overflow: hidden;

  border-radius: 25px;
  border: 1px solid var(--gray200);
  background-color: var(--white);
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05);

  transition: height 150ms ease;

  z-index: 2;

  & div {
    position: absolute;
    width: 100%;
    height: 50px;
  }

  & div:first-child {
    border-bottom: 1px solid var(--gray200);
  }

  & div:last-child {
    top: 48px;
  }
`;

const SearchIcon = styled.img<{
  $isMain: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 20px;

  transform: translate(${(props) => (props.$isMain ? 0 : -58)}px, -50%);

  transition: transform 150ms ease;
`;

const Input = styled.input<{
  $isMain: boolean;
  $selected: boolean;
}>`
  position: absolute;
  left: 20px;
  width: calc(100% - 40px);
  height: 50px;

  padding-top: ${(props) => (props.$selected && !props.$isMain ? 17 : 0)}px;
  padding-left: ${(props) => (props.$isMain ? 28 : 0)}px;

  color: var(--black);
  background-color: var(--white) 00;
  font-size: 16px;

  outline: none;
  border: none;

  transition: padding 150ms ease;

  &::placeholder {
    color: var(--gray400);

    opacity: ${(props) => (props.$selected ? 0 : 1)};
    transition: opacity 200ms ease;
  }
`;

const ToolTip = styled.p<{
  $selected: boolean;
}>`
  position: absolute;
  top: 7px;
  left: 20px;

  color: var(--gray400);
  font-size: 12px;

  opacity: ${(props) => (props.$selected ? 1 : 0)};
  transition: opacity 200ms ease;
`;
