import { styled } from 'styled-components';
import Complex from '../../components/Complex';
import { useEffect, useState } from 'react';
import api from '../../api.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SettingNumber() {
  const [number, setNumber] = useState<string>('');
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const phone = params.get('phone');
  const handleContinue = () => {
    // 01012345678 regex
    const regex = new RegExp(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
    if (!regex.test(number)) {
      setErrormsg('전화번호가 알맞는지 다시 확인해보세요.');
      return;
    }
    setErrormsg(undefined);
    setLoading(true);
    const body = {
      number: number,
    };
    api
      .post('/auth/is_user_exist', body)
      .then((r) => {
        if (r.data.message === 'exist') {
          setErrormsg('이미 가입된 전화번호에요.');
          setLoading(false);
        } else {
          api
            .post('/auth/send_code', body)
            .then(() => {
              setLoading(false);
              navigate(`/settings/verify?phone=${number}`, { replace: true });
            })
            .catch(() => {
              setLoading(false);
              setErrormsg('서버에서 오류가 발생했어요.');
            });
        }
      })
      .catch(() => {
        setLoading(false);
        setErrormsg('서버에서 오류가 발생했어요.');
      });
  };
  useEffect(() => {
    if (phone !== null) {
      setNumber(phone);
    }
  }, [phone]);
  return (
    <Complex
      title="전화번호 변경하기"
      description={`변경할 전화번호를 입력해주세요.`}
      content={
        <Input
          placeholder="전화번호를 입력하세요."
          type="tel"
          value={number}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && e.keyCode !== 8) {
              e.preventDefault();
            }
          }}
          onChange={(e) => setNumber(e.target.value)}
          disabled={loading}
        />
      }
      errormessage={errormsg}
      leftloretext="돌아가기"
      rightbtntext="계속하기"
      leftloreclick={() => {navigate('/settings', { replace: true })}}
      rightbtnclick={handleContinue}
      disabled={loading}
    />
  );
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
