import { useNavigate } from "react-router-dom";
import Complex from "../../components/Complex";
import { styled } from "styled-components";
import { useState } from "react";
import api from "../../api.ts";
import { tokenAtom } from "../../states/atom.ts";
import { useRecoilState } from "recoil";

export default function SettingCard() {
  const navigate = useNavigate();
  const [card, setCard] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const [token] = useRecoilState(tokenAtom)
  // regex for card number - 0 to 16 digits
  const regex = new RegExp(/^[0-9]{0,16}$/);
  const dummy = () => {
    navigate(`/settings`, { replace: true })
  }
  const next = () => {
    setLoading(true)
    api.get(`/user/${token}`).then((res) => {
      const body = {
        username: res.data.user.username,
        card_number: card,
        phone_number: res.data.user.phone_number,
        notification: true,
      }
      api.put(`/user/${token}`, body).then(() => {
        navigate(`/settings`, { replace: true })
      }).catch(() => {
        setErrormsg('서버에서 오류가 발생했어요.')
        setLoading(false)
      })
    }).catch(() => {
      setErrormsg('서버에서 오류가 발생했어요.')
      setLoading(false)
    })
  }
  return (
    <Complex title={ '교통카드 변경하기' } description={ '변경할 교통카드 번호를 입력해주세요.' } content={
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
    } leftloretext={ '돌아가기' } rightbtntext={ '변경하기' } leftloreclick={ dummy }
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
