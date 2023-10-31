import Complex from './Complex.tsx';
import styled from 'styled-components';
import React from "react";

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
  rightbtnclick: (authcode: number | undefined) => void;
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
          nextSibling.focus();
        }
        nextSibling = nextSibling.nextSibling as HTMLInputElement;
      }
    }
    if (value.length === 1) {
      const nextSibling = e.target.nextSibling as HTMLInputElement;
      if (e.target.name !== '6') {
        nextSibling.focus();
      }
    }
    if (e.target.name === '6') {
      // check if all inputs are filled
      let previous = e.target.previousSibling as HTMLInputElement;
      let allFilled = true;
      while (allFilled && previous !== null) {
        if (previous.value === '') {
          allFilled = false;
        }
        previous = previous.previousSibling as HTMLInputElement;
      }
      if (allFilled) {
        const authcode =
          Number(
            (document.querySelector('input[name="1"]') as HTMLInputElement)
              .value
          ) *
            100000 +
          Number(
            (document.querySelector('input[name="2"]') as HTMLInputElement)
              .value
          ) *
            10000 +
          Number(
            (document.querySelector('input[name="3"]') as HTMLInputElement)
              .value
          ) *
            1000 +
          Number(
            (document.querySelector('input[name="4"]') as HTMLInputElement)
              .value
          ) *
            100 +
          Number(
            (document.querySelector('input[name="5"]') as HTMLInputElement)
              .value
          ) *
            10 +
          Number(
            (document.querySelector('input[name="6"]') as HTMLInputElement)
              .value
          );
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
        if (e.target.name !== '1') {
          // @ts-ignore
          const previousSibling = e.target.previousSibling as HTMLInputElement;
          previousSibling.focus();
        }
        return;
      }
      // @ts-ignore
      const previousSibling = e.target.previousSibling as HTMLInputElement;
      // @ts-ignore
      if (e.target.name !== '1') {
        previousSibling.value = '';
        previousSibling.focus();
      }
    }
  };
  return (
    <Complex
      title={title}
      description={description}
      content={
        <VerifyArea>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <OneNumber
              name={item.toString()}
              key={item}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus={item === 1}
            />
          ))}
        </VerifyArea>
      }
      errormessage={errormsg}
      leftloretext={leftloretext}
      rightbtntext={rightbtntext}
      leftloreclick={leftloreclick}
      rightbtnclick={() => {
        const authcode =
          Number(
            (document.querySelector('input[name="1"]') as HTMLInputElement)
              .value
          ) *
            100000 +
          Number(
            (document.querySelector('input[name="2"]') as HTMLInputElement)
              .value
          ) *
            10000 +
          Number(
            (document.querySelector('input[name="3"]') as HTMLInputElement)
              .value
          ) *
            1000 +
          Number(
            (document.querySelector('input[name="4"]') as HTMLInputElement)
              .value
          ) *
            100 +
          Number(
            (document.querySelector('input[name="5"]') as HTMLInputElement)
              .value
          ) *
            10 +
          Number(
            (document.querySelector('input[name="6"]') as HTMLInputElement)
              .value
          );
        rightbtnclick(authcode);
      }}
      disabled={loading}
    />
  );
}

const VerifyArea = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 65px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const OneNumber = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid var(--gray200);
  border-radius: 10px;
  background-color: var(--white);
  font-size: 22px;
  text-align: center;
  outline: none;
  color: var(--black);
  padding: 0;
  box-sizing: border-box;
`;
