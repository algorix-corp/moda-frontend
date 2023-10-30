import { styled } from 'styled-components';
import Complex from '../../components/Complex';
import { useRecoilState } from 'recoil';
import { selectedAtom } from '../../states/atom';

export default function Login() {
    const [selected, setSelected] = useRecoilState(selectedAtom);
    return (
        <Complex
            title="모다 시작하기"
            description="모다 서비스를 이용하기 위해 먼저 전화번호를 입력해주세요."
            content={(
                <Input
                    placeholder="전화번호를 입력하세요."
                    type="tel"
                    autoCapitalize="off"
                    autoComplete="off"
                    autoCorrect="off"
                    pattern='[0-9]{3}-[0-9]{4}-[0-9]{4}'
                    required
                    onFocus={() => {
                        setSelected(1);
                    }}
                    onBlur={() => {
                        setSelected(0);
                    }}
                />
            )}
            leftloretext=''
            rightbtntext='계속하기'
            leftloreclick={() => alert("yee")}
            rightbtnclick={() => alert("yee")}
            selected={selected}
        />
    )
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