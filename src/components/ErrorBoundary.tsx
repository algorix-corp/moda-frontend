import CircleError from '../assets/65-circle-warning.svg';

export default function ErrorCatch() {
  return (
    <div>
      <img src={CircleError} />
      <h1>오류가 발생했어요.</h1>
      <button onClick={() => (window.location.href = '/')}>
        메인으로 이동하기
      </button>
    </div>
  );
}
