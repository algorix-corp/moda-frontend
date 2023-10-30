import {styled} from 'styled-components';
import Complex from '../../components/Complex';
import {useState} from 'react';
import api from '../../api.ts';
import {useNavigate} from 'react-router-dom';


export default function Login() {
  const [number, setNumber] = useState<string>('');
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleContinue = () => {
    // 01012345678 regex
    const regex = new RegExp(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
    if (!regex.test(number)) {
      setErrormsg('전화번호를 다시 확인해주세요.');
      return;
    }
    setErrormsg(undefined);
    setLoading(true);
    const body = {
      phone_number: number,
    };
    api.post('/auth/send_auth_code', body).then((r) => {
      if (r.data.registered) {
        navigate('/login/verify', {replace: true});
      } else {
        navigate('/login/register', {replace: true});
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setErrormsg('서버에서 오류가 발생했어요.');
    });
  };
  return (
    <Complex
      title="모다 시작하기"
      description={(<span>모다 서비스를 이용하기 위해<br/>먼저 전화번호를 입력해주세요.</span>)}
      content={(
        <Input
          placeholder="전화번호를 입력하세요."
          type="tel"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={(e) => setNumber(e.target.value)}
          disabled={loading}
        />
      )}
      errormessage={errormsg}
      leftloretext=""
      rightbtntext="계속하기"
      leftloreclick={() => alert('yee')}
      rightbtnclick={handleContinue}
      disabled={loading}
    />
  );
}

const Input = styled.input`
  height: 50px;
  color: var(--black);
  background-color: var(--white) 00;
  font-size: 15px;
  padding: 0 10px;
  outline: none;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
`;
