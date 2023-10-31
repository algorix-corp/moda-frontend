import {styled} from 'styled-components';
import Complex from '../../components/Complex';
import {useEffect, useState} from 'react';
import api from '../../api.ts';
import {useNavigate, useSearchParams} from 'react-router-dom';

export default function Login() {
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
      phone_number: number,
    };
    api
      .post('/auth/send_auth_code', body)
      .then((r) => {
        if (r.data.registered) {
          navigate('/login/verify?phone=' + number, {replace: true});
        } else {
          navigate('/login/register?phone=' + number, {replace: true});
        }
        setLoading(false);
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
  }, [phone])
  return (
    <Complex
      title="모다 시작하기"
      description={`모다 서비스를 이용하기 위해\n전화번호를 입력해주세요.`}
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
      leftloretext="스킵"
      rightbtntext="계속하기"
      leftloreclick={() => navigate(`/login/verify?phone=${number}`, {replace: true})}
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
  border: 1px solid #eeeeee;
  border-radius: 10px;

  margin-top: 30px;
`;
