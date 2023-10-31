import VerifyCode from '../../components/VerifyCode.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

export default function LoginVerify() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const phone = params.get('phone') ?? '';
  const leftloreclick = () => {
    navigate('/login?phone=' + phone, { replace: true });
  };
  const rightbtnclick = () => {
    navigate('/login', { replace: true });
  };
  const insertDash = (number: string) => {
    return number.slice(0, 3) + '-' + number.slice(3, 7) + '-' + number.slice(7, 11)
  }
  return (
    <VerifyCode
      title="기존 계정으로 로그인"
      description={`${insertDash(phone)}로 보내진\n6자리 인증 번호를 입력하여 계속 진행하세요.`}
      leftloretext="전화번호를 잘못 입력했어요."
      rightbtntext="로그인하기"
      leftloreclick={leftloreclick}
      rightbtnclick={rightbtnclick}
      loading={loading}
      errormsg={errormsg}
    />
  );
}
