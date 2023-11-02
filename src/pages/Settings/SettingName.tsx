import { useNavigate } from "react-router-dom";
import Complex from "../../components/Complex";
import { styled } from "styled-components";
import { useState } from "react";
import api from "../../api.ts";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../states/atom.ts";

export default function SettingName() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const [token] = useRecoilState(tokenAtom)
  const dummy = () => {
    navigate(`/settings`, { replace: true })
  }
  const next = () => {
    setDisabled(true)
    api.get(`/user/${token}`).then((res) => {
      const body = {
        username: name,
        card_number: res.data.user.card_number,
        phone_number: res.data.user.phone_number,
        notification: true,
      };
      api.put(`/user/${token}`, body).then(() => {
        navigate(`/settings`, { replace: true })
      }).catch(() => {
        setErrormsg('서버에서 오류가 발생했어요.')
        setDisabled(false)
      });
    }).catch(() => {
      setErrormsg('서버에서 오류가 발생했어요.')
      setDisabled(false)
    })
  }
  return (
    <Complex title={ '이름 변경하기' } description={ '변경할 이름을 입력해주세요.' } content={
      <Input
        placeholder="이름을 입력하세요."
        type="text"
        value={ name }
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={ (e) => setName(e.target.value) }
      />
    } leftloretext={ '돌아가기' } rightbtntext={ '변경하기' } leftloreclick={ dummy }
             rightbtnclick={ next } disabled={ disabled } errormessage={errormsg}/>
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
