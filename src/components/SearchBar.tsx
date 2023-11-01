import { styled } from 'styled-components';
import SearchSVG from '../assets/18-search.svg';
import { useRecoilState } from 'recoil';
import {
  departureAtom, departureNameAtom,
  destinationAtom,
  destinationNameAtom,
  Location,
  queriesAtom,
  selectedAtom
} from '../states/atom';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [, setQueries] = useRecoilState(queriesAtom);
  const [departure, setDeparture] = useRecoilState(departureAtom);
  const [destination, setDestination] = useRecoilState(destinationAtom);
  const location = useLocation();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const navigate = useNavigate();
  const [destinationtemp, setDestinationtemp] = useState('');
  const [departuretemp, setDeparturetemp] = useState('');
  const [destinationName ] = useRecoilState(destinationNameAtom);
  const [departureName] = useRecoilState(departureNameAtom);

  useEffect(() => {
    const changeQuery = setTimeout(() => {
      setQueries(destinationtemp === '' ? undefined : destinationtemp)
    }, 500)
    return () => {
      clearTimeout(changeQuery)
    }
  }, [destinationtemp, setQueries])
  useEffect(() => {
    const changeQuery = setTimeout(() => {
      setQueries(departuretemp === '' ? undefined : departuretemp)
    }, 500)
    return () => {
      clearTimeout(changeQuery)
    }
  }, [departuretemp, setQueries])

  useEffect(() => {
    if (location.pathname === '/') {
      setDeparture(undefined);
      setDestination(undefined);

      // @ts-ignore
      document.querySelector('.departure')!.value = null;
      // @ts-ignore
      document.querySelector('.destination')!.value = null;
      setSelected(0);
    } else if (
      location.pathname === '/search' &&
      departure !== undefined &&
      destination !== undefined
    ) {
      navigate('/preview', { replace: true });
    }
  }, [
    departure,
    destination,
    navigate,
    location,
    setDeparture,
    setDestination,
    setSelected,
  ]);

  useEffect(() => {
    if (location.pathname !== '/' && selected === 0) {
      if (departure === undefined) {
        setDeparture(Location.CURRENT);

        // @ts-ignore
        document.querySelector('.departure')!.value = '내 현재 위치';
      } else {
        // @ts-ignore
        document.querySelector('.departure')!.value =
          departure === Location.CURRENT
            ? '내 현재 위치'
            : departureName
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departure, selected]);

  useEffect(() => {
    if (selected === 0) {
      // @ts-ignore
      if (destination === undefined) {
        // @ts-ignore
        document.querySelector('.destination')!.value = '';
      } else if (destination === Location.CURRENT) {
        // @ts-ignore
        document.querySelector('.destination')!.value = '내 현재 위치';
      } else {
        // @ts-ignore
        document.querySelector('.destination')!.value = destinationName
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, selected]);

  return (
    <div>
      <Container $isMain={ location.pathname === '/' }>
        <div>
          <SearchIcon src={ SearchSVG } $isMain={ location.pathname === '/' }/>
          { location.pathname === '/' ? null : (
            <ToolTip $selected={ selected === 1 }>출발지</ToolTip>
          ) }
          <Input
            placeholder="오늘은 어디를 가고 싶으신가요?"
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="departure"
            $isMain={ location.pathname === '/' }
            $selected={ selected === 1 }
            onChange={ (e) => setDeparturetemp(e.target.value)
            }
            onFocus={ () => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.querySelector('.departure')!.value = '';
              setDeparture(undefined);

              navigate('/search', { replace: true });

              setSelected(1);
            } }
            onBlur={ () => {
              if (location.pathname !== '/') {
                //setSelected(0);
                //setQueries(undefined);
                //setDeparturetemp('')
                return;
              }
            } }
          ></Input>
        </div>
        <div>
          <ToolTip $selected={ selected === 2 }>목적지</ToolTip>
          <Input
            placeholder="목적지를 입력하세요."
            type="search"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="destination"
            $isMain={ location.pathname === '/' }
            $selected={ selected === 2 }
            onChange={ (e) => setDestinationtemp(e.target.value)
            }
            onFocus={ () => {
              if (location.pathname === '/preview') {
                setDestination(undefined);
                // @ts-ignore
                document.querySelector('.destination')!.value = '';

                navigate('/search', { replace: true });
              }

              setSelected(2);
            } }
            onBlur={ () => {
              //setSelected(0);
              //setQueries(undefined);
              //setDestinationtemp('')
            } }
          ></Input>
        </div>
      </Container>
      <MockContainer $isMain={ location.pathname === '/' }/>
    </div>
  );
}

const MockContainer = styled.div<{
  $isMain: boolean;
}>`
  width: 100vw;
  height: ${ (props) => (props.$isMain ? 50 : 100) }px;

  transition: height 150ms ease;
`;

const Container = styled.div<{
  $isMain: boolean;
}>`
  position: fixed;
  width: calc(100vw - 40px);
  height: ${ (props) => (props.$isMain ? 50 : 100) }px;
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

  transform: translate(${ (props) => (props.$isMain ? 0 : -58) }px, -50%);

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

  padding-top: ${ (props) => (props.$selected && !props.$isMain ? 17 : 0) }px;
  padding-left: ${ (props) => (props.$isMain ? 28 : 0) }px;

  color: var(--black);
  background-color: var(--white) 00;
  font-size: 16px;

  outline: none;
  border: none;

  transition: padding 150ms ease;

  &::placeholder {
    color: var(--gray400);

    opacity: ${ (props) => (props.$selected ? 0 : 1) };
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

  opacity: ${ (props) => (props.$selected ? 1 : 0) };
  transition: opacity 200ms ease;
`;
