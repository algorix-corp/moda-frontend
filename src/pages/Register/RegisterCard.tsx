import { useNavigate, useSearchParams } from "react-router-dom";
import Complex from "../../components/Complex";
import { styled } from "styled-components";
import { useState } from "react";
import api from "../../api.ts";

export default function RegisterCard() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone') ?? '';
  const name = params.get('name') ?? '';
  const [card, setCard] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  // regex for card number - 0 to 16 digits
  const regex = new RegExp(/^[0-9]{0,16}$/);
  const dummy = () => {
  }
  const next = () => {
    setLoading(true)
    const body = {
      "phone_number": phone,
      "username": name,
      "card_number": card,
      "notification": true
    }
    api.post('/user', body).then(() => {
      setLoading(false)
      navigate('/login/verify?phone=' + phone, { replace: true })
    }).catch(() => {
      setLoading(false)
      setErrormsg('서버에서 오류가 발생했어요.')
    })
  }
  return (
    <Complex title={ '새로운 계정 생성하기' } description={ 'DRT 결제에 사용할\n교통카드 번호를 입력해주세요.' } content={
      <Input
        placeholder="카드번호를 입력하세요."
        type="text"
        inputMode="numeric"
        value={ card }
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onKeyDown={ (e) => {
          const card_num = card + e.key
          if(!regex.test(card_num)) {
            e.preventDefault()
          }
        }}
        onChange={ (e) => {
          setCard(e.target.value)
        } }
        disabled={ loading }
      />
    } leftloretext={ '' } rightbtntext={ '계속하기' } leftloreclick={ dummy }
             rightbtnclick={ next } disabled={ loading } errormessage={ errormsg }/>
  )
}


const Input = styled.input`
  height: 50px;
  color: var(--black);
  background-color: var(--white) 00;
  font-size: 16px;
  padding: 0 15px;
  outline: none;
  border: 1px solid var(--gray200);
  border-radius: 10px;

  margin-top: 30px;
`;
