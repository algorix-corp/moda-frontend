import VerifyCode from "../../components/VerifyCode.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export default function RegisterVerify() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const leftloreclick = () => {
    navigate('/login');
  }
  const rightbtnclick = () => {
    navigate('/login');
  }
  return (
    <VerifyCode title="새 계정 만들기" description="인증번호를 입력해\가입을 완료하세요." leftloretext="입력한 정보를 수정할래요."
                rightbtntext="가입하기" leftloreclick={leftloreclick} rightbtnclick={rightbtnclick}
                loading={loading} errormsg={errormsg}/>
  )
}
