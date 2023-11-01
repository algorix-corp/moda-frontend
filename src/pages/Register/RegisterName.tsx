import { useNavigate, useSearchParams } from "react-router-dom";
import Complex from "../../components/Complex";
import { styled } from "styled-components";
import { useState } from "react";

export default function RegisterName() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const phone = params.get('phone') ?? '';
  const [name, setName] = useState<string>('');
  const dummy = () => {
  }
  const next = () => {
    navigate(`/register/card?phone=${ phone }&name=${ name }`, { replace: true })
  }
  return (
    <Complex title={ '새로운 계정 생성하기' } description={ '모다에서 사용할 사용자님의 이름을 입력해주세요.' } content={
      <Input
        placeholder="이름을 입력하세요."
        type="text"
        value={ name }
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={ (e) => setName(e.target.value) }
      />
    } leftloretext={ '' } rightbtntext={ '계속하기' } leftloreclick={ dummy }
             rightbtnclick={ next } disabled={ false }/>
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
