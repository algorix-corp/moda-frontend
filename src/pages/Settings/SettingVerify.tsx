import VerifyCode from '../../components/VerifyCode.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import api from "../../api.ts";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../states/atom.ts";

export default function SettingVerify() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errormsg, setErrormsg] = useState<string | undefined>(undefined);
  const [token] = useRecoilState(tokenAtom)
  const phone = params.get('phone') ?? '';
  const leftloreclick = () => {
    navigate('/settings/phone?phone=' + phone, { replace: true });
  };
  const rightbtnclick = (number: number|string) => {
    setLoading(true)
    // if number is not 6 digits add 0 to start
    if(number.toString().length !== 6) {
      number = parseInt('0' + number.toString()).toString();
    }
    while(number.toString().length !== 6) {
      number = '0' + number.toString();
    }
    const body = {
      phone: phone,
      code: number.toString(),
    }
    api.post('/auth/verify', body).then((r) => {
      if(r.data.message === 'success') {
        api.get(`/user/${token}`).then((res) => {
          const body = {
            username: res.data.user.username,
            card_number: res.data.user.card_number,
            phone_number: phone,
            notification: true,
          }
          api.put(`/user/${token}`, body).then(() => {
            navigate('/settings', { replace: true })
          }).catch(() => {
            setErrormsg('서버에서 오류가 발생했어요.')
            setLoading(false)
          })
        }).catch(() => {
          setErrormsg('서버에서 오류가 발생했어요.')
          setLoading(false)
        })
      } else {
        setLoading(false);
        setErrormsg('인증 번호가 일치하지 않아요.');
      }
    }).catch(() => {
      setLoading(false);
      setErrormsg('서버에서 오류가 발생했어요.');
    })
  };
  const insertDash = (number: string) => {
    return number.slice(0, 3) + '-' + number.slice(3, 7) + '-' + number.slice(7, 11)
  }
  return (
    <VerifyCode
      title="전화번호 인증"
      description={`${insertDash(phone)}로 보내진\n6자리 인증 번호를 입력하여 전화번호를 변경하세요.`}
      leftloretext="전화번호를 잘못 입력했어요."
      rightbtntext="로그인하기"
      leftloreclick={leftloreclick}
      rightbtnclick={rightbtnclick}
      loading={loading}
      errormsg={errormsg}
    />
  );
}
