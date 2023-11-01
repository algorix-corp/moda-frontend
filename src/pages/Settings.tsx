import styled from "styled-components";
import ViewMore from '../assets/view-more.svg'
import HumanIcon from '../assets/human.svg'
import { useRecoilState } from "recoil";
import { tokenAtom } from "../states/atom.ts";
import { useNavigate } from "react-router-dom";

function SettingItem({ icon, title, description, onClick, destructive = false, smallTitle = false }: {
  icon: string,
  title: string,
  description?: string,
  onClick: () => void,
  destructive?: boolean,
  smallTitle?: boolean,
}) {
  return (
    <SettingArea onClick={ onClick }>
      <Icon>
        <img src={ icon } alt="아이콘"/>
      </Icon>
      <TitleArea>
        {
          smallTitle ?
            (
              <>
                <TitleSecondary>{ title }</TitleSecondary>
                <TitlePrimary $destructive={destructive}>{ description }</TitlePrimary>
              </>
            ) : (
              <>
                <TitlePrimary $destructive={destructive}>{ title }</TitlePrimary>
                <TitleSecondary>{ description }</TitleSecondary>
              </>
            )
        }
      </TitleArea>
      <ViewMoreIcon>
        <img src={ ViewMore } alt="go"/>
      </ViewMoreIcon>
    </SettingArea>
  );
}

export default function Settings() {
  const [, setToken] = useRecoilState(tokenAtom)
  const navigate = useNavigate()
  return (
    <Container>
      <div style={ { padding: '16px 0 ' } }>
        <Title>설정</Title>
      </div>
      <SettingItem icon={ HumanIcon } title="이름" description="김민건" smallTitle={true} onClick={ () => {
      } }/>
      <SettingItem icon={ HumanIcon } title="전화번호" description="010-9706r-4892" smallTitle={true} onClick={ () => {
      } }/>
      <SettingItem icon={ HumanIcon } title="교통카드" description="4242-4242-4242-4242" smallTitle={true} onClick={ () => {
      } }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="알림" description="DRT 예약 시간 10분 전 푸시 알림을 보내줘요." onClick={ () => {
      } }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="이용약관" onClick={ () => {
      } }/>
      <SettingItem icon={ HumanIcon } title="개인정보처리방침" onClick={ () => {
      } }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="로그아웃" onClick={ () => { setToken(undefined)
      } }/>
      <SettingItem icon={ HumanIcon } title="모다 계정 삭제하기" onClick={ () => {
      } } destructive={true}/>
    </Container>
  );
}

const Container = styled.div`
  margin: 20px;
  width: 100%;
  height: calc(100vh - 94px);
`;

const Title = styled.span`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const Divider = styled.div`
  width: 100%;
  height: 4px;
  margin-left: -20px;
  background-color: var(--gray100);
`;

const SettingArea = styled.div`
  width: calc(100vw - 40px);
  height: 60px;
  display: grid;
  grid-template-columns: 37px 1fr 14px;
  border-bottom: 1px solid var(--gray100);
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const TitlePrimary = styled.p<{
  $destructive?: boolean
}>`
  margin: 0;
  font-size: 15px;
  color: ${(props) => props.$destructive ? 'var(--red)' : 'var(--black)'};
  font-weight: 400;
`;

const TitleSecondary = styled.p`
  margin: 0;
  color: var(--gray400);
  font-size: 10px;
  font-weight: 400;
`;

const Icon = styled.div`
  height: 100%;
  width: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const ViewMoreIcon = styled.div`
  height: 100%;
  width: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
