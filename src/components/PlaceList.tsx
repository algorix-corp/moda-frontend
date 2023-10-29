import styled from 'styled-components';
import { places } from '../dummy';
import CircleLocationSVG from '../assets/27-circle-location.svg';
// import CircleMapSVG from '../assets/27-circle-map.svg';
import CircleSaveSVG from '../assets/27-circle-save.svg';
import CircleSearchSVG from '../assets/27-circle-search.svg';
import SaveSVG from '../assets/24-save.svg';
import UnsaveSVG from '../assets/24-unsave.svg';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Location,
  departureAtom,
  destinationAtom,
  savedAtom,
  selectedAtom,
} from '../states/atom';

function blurObject(className: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  document.querySelector(`.${className}`)!.blur();
}

export default function PlaceList() {
  const [selected] = useRecoilState(selectedAtom);
  const [, setDeparture] = useRecoilState(departureAtom);
  const [, setDestination] = useRecoilState(destinationAtom);
  const [saved, setSaved] = useRecoilState(savedAtom);
  const [lastObjInQueue, setLastObjInQueue] = useState<null | number>(null);
  const [lastObj, setLastObj] = useState<null | number>(null);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);

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
          if (selected === 1) {
            setDeparture(Location.CURRENT);
            blurObject('departure');
          } else if (selected === 2) {
            setDestination(Location.CURRENT);
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
        .filter((place) => saved.includes(place.id))
        .map((place, index) => (
          <PlaceGroup
            key={index}
            onTouchStart={() => {
              setLastObjInQueue(index);
            }}
            onTouchEnd={() => {
              if (selected === 1) {
                setDeparture(place.id);
                blurObject('departure');
              } else if (selected === 2) {
                setDestination(place.id);
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
              onTouchEnd={() => {
                setIsSwiped(false);
                setLastObj(null);
                setLastObjInQueue(null);
                setTimeout(() => {
                  setSaved(saved.filter((item) => item !== place.id));
                }, 150);
              }}
            >
              <Icon src={UnsaveSVG} />
            </SaveButton>
          </PlaceGroup>
        ))}
      {places
        .filter((place) => !saved.includes(place.id))
        .map((place, index) => (
          <PlaceGroup
            key={index}
            onTouchStart={() => {
              setLastObjInQueue(index + saved.length);
            }}
            onTouchEnd={() => {
              if (selected === 1) {
                setDeparture(place.id);
                blurObject('departure');
              } else if (selected === 2) {
                setDestination(place.id);
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

                setIsSwiped(false);
                setLastObj(null);
                setLastObjInQueue(null);
                setTimeout(() => {
                  setSaved([...saved, place.id]);
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
