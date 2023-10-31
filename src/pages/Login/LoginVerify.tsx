import VerifyCode from "../../components/VerifyCode.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";


export default function LoginVerify() {
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
    const phone = params.get('phone') ?? '';
    const leftloreclick = () => {
        navigate('/login?phone=' + phone, {replace: true});
    }
    const rightbtnclick = () => {
        navigate('/login', {replace: true});
    }
    return (
        <VerifyCode title="기존 계정으로 로그인" description="인증번호를 입력해\n로그인을 완료하세요." leftloretext="전화번호를 잘못 입력했어요."
                    rightbtntext="로그인" leftloreclick={leftloreclick} rightbtnclick={rightbtnclick} loading={loading}
                    errormsg={errormsg}/>
    )
}
