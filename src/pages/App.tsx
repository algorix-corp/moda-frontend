import Button from '../components/Button.tsx';
import { useRecoilState } from 'recoil';
import { counter } from '../states/atom.ts';
import { useIP } from '../requests/useIP.ts';

export default function App() {
  const [count, setCount] = useRecoilState(counter)
  const { data, isLoading, isError } = useIP()
  
  if (isError) return (
    <>
      error
    </>
  )
  return (
    <>
      <h1>{count}</h1>
      <Button onClick={() => setCount(count+1)}>Click me!</Button>
      {isLoading ? <p>Loading...</p> : <p>{ data }</p>}
    </>
  )
}
