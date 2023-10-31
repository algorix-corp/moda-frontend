import Complex from '../../components/Complex.tsx';
import styled from 'styled-components';
import React, {useState} from 'react';

export default function RegisterVerify() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, '');
    if (value.length > 1) {
      let index = 0;
      const value = e.target.value;
      e.target.value = value[index++];
      let nextSibling = e.target.nextSibling as HTMLInputElement;
      while (nextSibling !== undefined && nextSibling !== null) {
        if (value[index] === undefined) return;
        if (nextSibling.tagName === 'INPUT') {
          nextSibling.value = value[index++];
          nextSibling.focus()
        }
        nextSibling = nextSibling.nextSibling as HTMLInputElement;
      }
    }
    if (value.length === 1) {
      const nextSibling = e.target.nextSibling as HTMLInputElement;
      if (e.target.id !== '6') {
        nextSibling.focus();
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (e.target.value !== '') {
        e.preventDefault();
        e.target.value = '';
        if (e.target.id !== '1') {
          const previousSibling = e.target.previousSibling as HTMLInputElement;
          previousSibling.focus();
        }
        return;
      }
      // @ts-ignore
      const previousSibling = e.target.previousSibling as HTMLInputElement;
      // @ts-ignore
      if (e.target.id !== '1') {
        previousSibling.value = '';
        previousSibling.focus();
      }
    }
  };
  return (
    <Complex
      title="새로운 계정 가입하기"
      description={(<span>마지막으로,<br/>인증번호를 입력해주세요.</span>)}
      content={(
        <VerifyArea>
          <OneNumber id="1" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
          <OneNumber id="2" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
          <OneNumber id="3" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
          <OneNumber id="4" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
          <OneNumber id="5" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
          <OneNumber id="6" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="tel"/>
        </VerifyArea>
      )}
      errormessage={errormsg}
      leftloretext="카드번호 변경하기"
      rightbtntext="계속하기"
      leftloreclick={() => alert('go back')}
      rightbtnclick={() => alert('forward')}
      disabled={loading}
    />
  );
}

const OneNumber = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray300);
  border-radius: 10px;
  background-color: var(--white);
  font-size: 30px;
  text-align: center;
  outline: none;
  color: var(--black);
  font-weight: 500;
  margin-right: 10px;
  padding: 0;
  box-sizing: border-box;

  &::placeholder {
    color: var(--gray500);
  }
`;

const VerifyArea = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
