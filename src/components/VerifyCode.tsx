import Complex from './Complex.tsx';
import styled from 'styled-components';
import React, {useState} from 'react';

export default function VerifyCode({
                                       title,
                                       description,
                                       leftloretext,
                                       rightbtntext,
                                       leftloreclick,
                                       rightbtnclick,
    errormsg,
    loading,
                                   }: {
    title: string;
    description: string;
    leftloretext: string;
    rightbtntext: string;
    leftloreclick: () => void;
    rightbtnclick: (authcode: number|undefined) => void;
    errormsg?: string;
    loading: boolean;
}) {
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
        if (e.target.id === '6') {
            // check if all inputs are filled
            let previous = e.target.previousSibling as HTMLInputElement;
            let allFilled = true;
            while(allFilled && previous !== null) {
                if (previous.value === '') {
                    allFilled = false;
                }
                previous = previous.previousSibling as HTMLInputElement;
            }
            if (allFilled) {
                const authcode = Number((document.querySelector('#1') as HTMLInputElement).value) * 100000 +
                    Number((document.querySelector('#2') as HTMLInputElement).value) * 10000 +
                    Number((document.querySelector('#3') as HTMLInputElement).value) * 1000 +
                    Number((document.querySelector('#4') as HTMLInputElement).value) * 100 +
                    Number((document.querySelector('#5') as HTMLInputElement).value) * 10 +
                    Number((document.querySelector('#6') as HTMLInputElement).value);
                rightbtnclick(authcode);
            }
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            // @ts-ignore
            if (e.target.value !== '') {
                e.preventDefault();
                // @ts-ignore
                e.target.value = '';
                // @ts-ignore
                if (e.target.id !== '1') {
                    // @ts-ignore
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
            title={title}
            description={description}
            content={(
                <VerifyArea>
                    <OneNumber id="1" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                    <OneNumber id="2" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                    <OneNumber id="3" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                    <OneNumber id="4" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                    <OneNumber id="5" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                    <OneNumber id="6" onChange={handleChange} onKeyDown={handleKeyDown} placeholder="0" type="text"
                               inputMode="numeric" autoComplete="one-time-code"/>
                </VerifyArea>
            )}
            errormessage={errormsg}
            leftloretext={leftloretext}
            rightbtntext={rightbtntext}
            leftloreclick={leftloreclick}
            rightbtnclick={() => {
                const authcode = Number((document.querySelector('#1') as HTMLInputElement).value) * 100000 +
                    Number((document.querySelector('#2') as HTMLInputElement).value) * 10000 +
                    Number((document.querySelector('#3') as HTMLInputElement).value) * 1000 +
                    Number((document.querySelector('#4') as HTMLInputElement).value) * 100 +
                    Number((document.querySelector('#5') as HTMLInputElement).value) * 10 +
                    Number((document.querySelector('#6') as HTMLInputElement).value);
                rightbtnclick(authcode);
            }}
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
