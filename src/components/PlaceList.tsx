import styled from 'styled-components';
import CircleLocationSVG from '../assets/27-circle-location.svg';
// import CircleMapSVG from '../assets/27-circle-map.svg';
import CircleSaveSVG from '../assets/27-circle-save.svg';
import CircleSearchSVG from '../assets/27-circle-search.svg';
import SaveSVG from '../assets/24-save.svg';
import UnsaveSVG from '../assets/24-unsave.svg';
import { useSwipeable } from 'react-swipeable';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  departureAtom,
  departureNameAtom,
  destinationAtom,
  destinationNameAtom,
  Location,
  placesAtom,
  queriesAtom,
  savedAtom,
  selectedAtom,
  tokenAtom,
} from '../states/atom';
import api from '../api.ts';

function blurObject(className: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.querySelector(`.${className}`)!.blur();
}

interface Place {
  id: number;
  name: string;
  address: string;
}

export default function PlaceList() {
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [, setDeparture] = useRecoilState(departureAtom);
  const [, setDestination] = useRecoilState(destinationAtom);
  const [saved, setSaved] = useRecoilState(savedAtom);
  const [lastObjInQueue, setLastObjInQueue] = useState<null | number>(null);
  const [lastObj, setLastObj] = useState<null | number>(null);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [queries, setQueries] = useRecoilState(queriesAtom);
  const [places, setPlaces] = useRecoilState(placesAtom);
  const [token] = useRecoilState(tokenAtom);
  const [, setDepartureName] = useRecoilState(departureNameAtom);
  const [, setDestinationName] = useRecoilState(destinationNameAtom);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(true);
    }

    function handleScrollEnd() {
      setTimeout(() => {
        setIsScrolling(false);
      }, 50);
    }

    window.addEventListener('touchmove', handleScroll);
    window.addEventListener('touchend', handleScrollEnd);

    return () => {
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('touchend', handleScrollEnd);
    };
  }, []);

  useEffect(() => {
    api.get(`/user/${token}/bookmarks`).then((r) => {
      setSaved(r.data.bookmarks);
    });
  }, [token, setSaved]);

  useEffect(() => {
    if (queries == undefined) {
      setPlaces([]);
      return;
    }
    api.get(`/map/search/${queries}`).then((r) => {
      const pois = r.data.searchPoiInfo.pois.poi;
      const places: Place[] = [];
      for (let i = 0; i < pois.length; i++) {
        places.push({
          id: pois[i].id,
          name: pois[i].name,
          address:
            pois[i].upperAddrName +
            ' ' +
            pois[i].middleAddrName +
            ' ' +
            pois[i].lowerAddrName +
            ' ' +
            pois[i].roadName +
            ' ' +
            pois[i].firstBuildNo,
        });
      }
      setPlaces(places);
    });
  }, [queries, setSaved, setPlaces]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsSwiped(true);
      setLastObj(lastObjInQueue);
      setLastObjInQueue(null);
    },
    onSwipedRight: () => setIsSwiped(false),
    onTap: () => setIsSwiped(false),
  });

  return (
    <Container {...handlers}>
      {/* <PlaceGroup>
        <ContentsGroup>
          <IdenticalIcon src={CircleMapSVG} />
          <TextGroup>
            <Name>지도에서 고르기</Name>
          </TextGroup>
        </ContentsGroup>
      </PlaceGroup> */}
      <PlaceGroup
        onTouchEnd={() => {
          if (isScrolling) return;
          setSelected(0);
          setQueries(undefined);
          if (selected === 1) {
            setDeparture(Location.CURRENT);
            setDepartureName('내 현재 위치');
            blurObject('departure');
          } else if (selected === 2) {
            setDestination(Location.CURRENT);
            setDestinationName('내 현재 위치');
            blurObject('destination');
          }
        }}
      >
        <ContentsGroup>
          <IdenticalIcon src={CircleLocationSVG} />
          <TextGroup>
            <Name>내 현재 위치</Name>
          </TextGroup>
        </ContentsGroup>
      </PlaceGroup>
      {places
        .filter((place) => {
          for (let i = 0; i < saved.length; i++) {
            if (saved[i].id === place.id) {
              return true;
            }
          }
        })
        .map((place, index) => (
          <PlaceGroup
            key={index}
            onTouchStart={() => {
              setLastObjInQueue(index);
            }}
            onTouchEnd={() => {
              if (isSwiped) return;
              if (isScrolling) return;
              setSelected(0);
              setQueries(undefined);
              if (selected === 1) {
                setDeparture(place.id);
                setDepartureName(place.name);
                blurObject('departure');
              } else if (selected === 2) {
                setDestination(place.id);
                setDestinationName(place.name);
                blurObject('destination');
              }
            }}
          >
            <ContentsGroup $swiped={lastObj === index && isSwiped}>
              <IdenticalIcon src={CircleSaveSVG} />
              <TextGroup>
                <Name>{place.name}</Name>
                <Address>{place.address}</Address>
              </TextGroup>
            </ContentsGroup>
            <SaveButton
              type="unsave"
              $swiped={lastObj === index && isSwiped}
              onTouchEnd={(e) => {
                e.stopPropagation();
                setTimeout(() => {
                  setIsSwiped(false);
                  setLastObj(null);
                  setLastObjInQueue(null);
                }, 10);
                setTimeout(() => {
                  setSaved(saved.filter((item) => item.id !== place.id));
                }, 150);
                e.stopPropagation();
              }}
            >
              <Icon src={UnsaveSVG} />
            </SaveButton>
          </PlaceGroup>
        ))}
      {places
        .filter((place) => {
          let flag = true;
          for (let i = 0; i < saved.length; i++) {
            if (saved[i].id === place.id) {
              flag = false;
              break;
            }
          }
          return flag;
        })
        .map((place, index) => (
          <PlaceGroup
            key={index}
            onTouchStart={() => {
              setLastObjInQueue(index + saved.length);
            }}
            onTouchEnd={() => {
              if (isSwiped) return;
              if (isScrolling) return;
              setSelected(0);
              setQueries(undefined);
              if (selected === 1) {
                setDeparture(place.id);
                setDepartureName(place.name);
                blurObject('departure');
              } else if (selected === 2) {
                setDestination(place.id);
                setDestinationName(place.name);
                blurObject('destination');
              }
            }}
          >
            <ContentsGroup
              $swiped={lastObj === index + saved.length && isSwiped}
            >
              <IdenticalIcon src={CircleSearchSVG} />
              <TextGroup>
                <Name>{place.name}</Name>
                <Address>{place.address}</Address>
              </TextGroup>
            </ContentsGroup>
            <SaveButton
              type="save"
              $swiped={lastObj === index + saved.length && isSwiped}
              onTouchEnd={(e) => {
                e.stopPropagation();

                setTimeout(() => {
                  setIsSwiped(false);
                  setLastObj(null);
                  setLastObjInQueue(null);
                }, 10);

                setTimeout(() => {
                  const new_saved = {
                    id: place.id,
                    name: place.name,
                    address: place.address,
                  };
                  setSaved([...saved, new_saved]);
                }, 150);

                e.stopPropagation();
              }}
            >
              <Icon src={SaveSVG} />
            </SaveButton>
          </PlaceGroup>
        ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10px;
  width: 100vw;
  height: calc(100vh - 100px - 10px - 94px);

  overflow-x: hidden;
`;

const PlaceGroup = styled.div`
  width: 100%;
  height: 75px;

  display: flex;

  border-bottom: 1px solid var(--gray100);
`;

const ContentsGroup = styled.div<{
  $swiped?: boolean;
}>`
  position: relative;
  left: 20px;
  width: calc(100% - 40px);
  height: 100%;

  transform: translateX(${(props) => (props.$swiped ? -60 : 0)}px);

  display: flex;
  align-items: center;

  transition: transform 150ms ease;
`;

const IdenticalIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const TextGroup = styled.div`
  margin-left: 10px;
`;

const Name = styled.p`
  color: var(--black);
  font-size: 17px;
`;

const Address = styled.p`
  margin-top: 2px;

  color: var(--gray400);
  font-size: 13px;
`;

const Icon = styled.img`
  position: relative;
  top: 50%;
  right: -17px;

  transform: translateY(-50%);
`;

const SaveButton = styled.div<{
  type: 'save' | 'unsave';
  $swiped: boolean;
}>`
  position: relative;
  width: 60px;
  height: 75px;

  transform: translateX(${(props) => (props.$swiped ? 0 : 60)}px);
  z-index: 1;

  background-color: var(
    --${(props) => (props.type === 'save' ? 'primarySub' : 'redSub')}
  );

  transition: transform 150ms ease;
`;
