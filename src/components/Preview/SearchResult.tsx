import styled from 'styled-components';
import DRTPlace from '../Result/DRTPlace.tsx';
import NormalPlace from '../Result/NormalPlace.tsx';
import Line from '../Result/Line.tsx';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { resultdataAtom } from "../../states/atom.ts";

const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${ hours }:${ minutes }`;
}

const addTimeToOriginalTime = (original: string, addMinutes: number[]) => {
  const originalHours = parseInt(original.split(':')[0]);
  const originalMinutes = parseInt(original.split(':')[1]);
  let hours = originalHours;
  let minutes = originalMinutes;
  for (let i = 0; i < addMinutes.length; i++) {
    minutes += addMinutes[i];
  }
  while (minutes >= 60) {
    hours += 1;
    minutes -= 60;
  }
  if (minutes < 10) {
    return `${ hours }:0${ minutes }`;
  }
  return `${ hours }:${ minutes }`;
}

const secondsToMinutes = (seconds: number) => {
  return Math.floor(seconds / 60);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchResult({ data }: { data: any }) {
  const [, setdata] = useRecoilState(resultdataAtom)
  const [time] = useState<string>(getCurrentTime());
  let sectionTime = 0
  useEffect(() => {
    setdata(data)
  }, [setdata, data])
  return (
    <Container>
      <Text>
        모다가 <span>최적</span>의 경로를 찾았어요.
      </Text>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.route.map((route: any, index: number) => {
          const last = data.route.length - 1 === index;
          if (route.mode === 'DRT') {
            sectionTime += route.sectionTime
            return (
              <>
                <DRTPlace
                  key={ index }
                  time={ addTimeToOriginalTime(time, [secondsToMinutes(sectionTime)]) }
                  instruction={ route.mention }
                />
                { last ? undefined :
                  <Line time={ `${ secondsToMinutes(sectionTime) }분` } solid={ true } DRT={ true }/> }
              </>
            )
          }  else if (route.mode === 'WALK') {
            sectionTime += route.sectionTime
            return (
              <>
              <NormalPlace
                key={ index }
                time={ addTimeToOriginalTime(time, [secondsToMinutes(sectionTime)]) }
                instruction={ `<span>${ route.start.name }</span>에서 <span>${ route.end.name }</span>까지 도보 이동` }
              />
                { last ? undefined : <Line time={`${secondsToMinutes(sectionTime)}분`} solid={false} DRT={false} /> }
              </>
            )
          } else {
            sectionTime += route.sectionTime
            return (
              <>
                <NormalPlace
                  key={ index }
                  time={ addTimeToOriginalTime(time, [secondsToMinutes(sectionTime)]) }
                  instruction={ `<span>${ route.route }</span>를 이용해 <span>${ route.start.name }</span>에서 <span>${ route.end.name }</span>까지 이동` }
                />
                { last ? undefined :
                  <Line time={ `${ secondsToMinutes(sectionTime) }분` } solid={ true } DRT={ false }/> }
              </>
            )
          }
        })
      }
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 100px - 94px - 185px);
  padding: 20px;
  margin-top: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 10px 0;

  & > span {
    color: var(--primary);
  }
`;
