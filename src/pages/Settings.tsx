import styled from "styled-components";
import ViewMore from '../assets/view-more.svg'
import HumanIcon from '../assets/human.svg'
import { useRecoilState } from "recoil";
import { tokenAtom } from "../states/atom.ts";
import { useNavigate } from "react-router-dom";
import api from "../api.ts";
import { useEffect, useState } from "react";

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
                <TitlePrimary $destructive={ destructive }>{ description }</TitlePrimary>
              </>
            ) : (
              <>
                <TitlePrimary $destructive={ destructive }>{ title }</TitlePrimary>
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
  const [token, setToken] = useRecoilState(tokenAtom)
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [card, setCard] = useState<string>('')
  const navigate = useNavigate()
  useEffect(() => {
    api.get(`/user/${ token }`).then((r) => {
      setName(r.data.user.username)
      const phone = r.data.user.phone_number
      setPhone(phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7, 11))
      const card = r.data.user.card_number
      setCard(card.slice(0, 4) + '-' + card.slice(4, 8) + '-' + card.slice(8, 12) + '-' + card.slice(12, 16))
    }).catch(() => {
      setName('오류가 발생했습니다.')
    })
  }, [token])
  const handleNameChange = () => {

    const newName = prompt('이름을 입력해주세요.')
    if (newName === '') {
      return
    }
    const body = {
      username: newName,
      card_number: card.replace(/-/g, ''),
      phone_number: phone.replace(/-/g, ''),
      notification: true
    }
    api.put(`/user/${ token }`, body).then(() => {
      window.location.reload()
    })
  }
  const handlePhoneChange = () => {
    const newPhone = prompt('전화번호를 입력해주세요.')
    if (newPhone === '') {
      return
    }
    const body_verify = {
      number: newPhone.replace(/-/g, ''),
    }
    api.post('/auth/is_user_exist', body_verify).then((r) => {
      if(r.data.message === 'exist') {
        alert('이미 존재하는 전화번호입니다.')
        return
      }
    }).catch(() => {
      alert('오류가 발생했습니다.')
      return
    })
    api.post('/auth/send_code', body_verify).then().catch(() => {
      alert('오류가 발생했습니다.')
      return
    })
    const code = prompt('인증번호를 입력해주세요.')
    if (code === '') {
      return
    }
    api.post('/auth/verify', {
      phone: newPhone.replace(/-/g, ''),
      code: code
    }).then(() => {
      const body = {
        username: name,
        card_number: card.replace(/-/g, ''),
        phone_number: newPhone.replace(/-/g, ''),
        notification: true
      }
      api.put(`/user/${ token }`, body).then(() => {
        window.location.reload()
      })
    }).catch(() => {
      alert('인증번호가 일치하지 않거나 오류가 발생했습니다.')
      return
    })
  }
  const handleCardChange = () => {
    const newCard = prompt('교통카드 번호를 입력해주세요.')
    if (newCard === '') {
      return
    }
    const body = {
      username: name,
      card_number: newCard.replace(/-/g, ''),
      phone_number: phone.replace(/-/g, ''),
      notification: true
    }
    api.put(`/user/${ token }`, body).then(() => {
      window.location.reload()
    })
  }
  return (
    <Container>
      <div style={ { padding: '16px 0 ' } }>
        <Title>설정</Title>
      </div>
      <SettingItem icon={ HumanIcon } title="이름" description={ name } smallTitle={ true } onClick={ handleNameChange }/>
      <SettingItem icon={ HumanIcon } title="전화번호" description={ phone } smallTitle={ true }
                   onClick={ handlePhoneChange }/>
      <SettingItem icon={ HumanIcon } title="교통카드" description={ card } smallTitle={ true }
                   onClick={ handleCardChange }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="알림" description="DRT 예약 시간 10분 전 푸시 알림을 보내줘요." onClick={ () => {
        alert("이 기능은 준비 중이에요.")
      } }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="이용약관" onClick={ () => {
        navigate('/settings/tos', { replace: true })
      } }/>
      <SettingItem icon={ HumanIcon } title="개인정보처리방침" onClick={ () => {
        navigate('/settings/privacy', { replace: true })
      } }/>
      <Divider/>
      <SettingItem icon={ HumanIcon } title="로그아웃" onClick={ () => {
        setToken(undefined)
        localStorage.removeItem('token')
      } }/>
      <SettingItem icon={ HumanIcon } title="모다 계정 삭제하기" onClick={ () => {
        api.delete(`/user/${ token }`).then()
        setToken(undefined)
        localStorage.removeItem('token')
      } } destructive={ true }/>
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
  color: ${ (props) => props.$destructive ? 'var(--red)' : 'var(--black)' };
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
