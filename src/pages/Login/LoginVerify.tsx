import VerifyCode from "../../components/VerifyCode.tsx";
import {useNavigate} from "react-router-dom";


export default function LoginVerify() {
    const navigate = useNavigate()
    const leftloreclick = () => {
        navigate('/login');
    }
    const rightbtnclick = () => {
        navigate('/login');
    }
    return (
        <VerifyCode title="기존 계정으로 로그인" description="인증번호를 입력해\n로그인을 완료하세요." leftloretext="전화번호를 잘못 입력했어요."
                    rightbtntext="로그인" leftloreclick={leftloreclick} rightbtnclick={rightbtnclick}/>
    )
}
