import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';
import { schedules } from '../dummy.ts';
import CancelSVG from '../assets/24-cancel.svg';
import CircleWarningSVG from '../assets/65-circle-warning.svg';
import {Link} from 'react-router-dom';

export default function Landing() {
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
        <Container>
            <TextGroup>
                <Text>
                    미기님의{'\n'}
                    <span>DRT</span> 예약 일정이에요.
                </Text>
            </TextGroup>
            <ScheduleGroup {...handlers}>
                {schedules.length === 0 ? (
                    <ExceptionGroup>
                        <CircleWarningIcon src={CircleWarningSVG} />
                        <WarningText>예약된 일정이 없어요.</WarningText>
                    </ExceptionGroup>
                ) : (
                    schedules.map((item, index) => (
                        <Schedule
                            key={index}
                            onClick={() => setLastObjInQueue(index)}
                            onTouchStart={() => setLastObjInQueue(index)}
                        >
                            <ScheduleTextGroup>
                                <Name $swiped={lastObj === index && isSwiped}>{item.id}</Name>
                                <Place $swiped={lastObj === index && isSwiped}>
                                    {item.address}
                                </Place>
                            </ScheduleTextGroup>
                            <Time $swiped={lastObj === index && isSwiped}>{item.time}</Time>
                            <DeleteButton $swiped={lastObj === index && isSwiped}>
                                <CancelIcon src={CancelSVG} />
                            </DeleteButton>
                        </Schedule>
                    ))
                )}
            </ScheduleGroup>
            <Link to={'/login'} replace>로그인테스트</Link>
        </Container>
    );
}

const Container = styled.div``;

const TextGroup = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  height: 80px;

  display: flex;
  align-items: center;
`;

const Text = styled.p`
  color: var(--black);
  font-size: 22px;
  font-weight: 600;

  white-space: pre-wrap;

  & span {
    color: var(--primary);
  }
`;

const ScheduleGroup = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  width: calc(100vw - 40px);
  height: 375px;

  border-radius: 25px;
  border: 1px solid var(--gray200);
  background: var(--white);

  overflow: hidden;
`;

const Schedule = styled.div`
  width: 100%;
  height: 75px;
  padding: 0 25px 0 25px;

  border-bottom: 1px solid var(--gray100);

  overflow: hidden;
`;

const ScheduleTextGroup = styled.div`
  position: relative;
  top: 50%;
  width: 253px;

  float: left;
  transform: translateY(-50%);
`;

const Name = styled.p<{
    $swiped: boolean;
}>`
  transform: translateX(${(props) => (props.$swiped ? -60 : 0)}px);

  color: var(--black);
  font-size: 17px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  transition: transform 150ms ease;
`;

const Place = styled.p<{
    $swiped: boolean;
}>`
  margin-top: 2px;

  transform: translateX(${(props) => (props.$swiped ? -60 : 0)}px);

  color: var(--gray400);
  font-size: 13px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  transition: transform 150ms ease;
`;

const Time = styled.p<{
    $swiped: boolean;
}>`
  position: relative;
  top: 50%;
  right: ${(props) => (props.$swiped ? 60 : 0)}px;

  float: right;
  transform: translateY(-50%);

  color: var(--gray400);
  font-size: 13px;

  transition: right 100ms ease;
`;

const DeleteButton = styled.div<{
    $swiped: boolean;
}>`
  position: relative;
  width: 60px;
  height: 75px;
  left: 100%;
  right: 0;

  transform: translateX(${(props) => (props.$swiped ? -35 : 25)}px);

  background-color: var(--redSub);

  transition: transform 150ms ease;
`;

const CancelIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const ExceptionGroup = styled.div`
  position: relative;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

const CircleWarningIcon = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const WarningText = styled.p`
  margin-top: 5px;

  color: var(--black);
  font-weight: 500;
  font-size: 18px;
  text-align: center;
`;
