import '../assets/18-search.svg';

export default function Landing() {
  return (
    <div>
      <div
        style={{
          position: 'relative',
          width: 'calc(100vw - 40px)',
          height: 50,
          left: 20,
          borderRadius: 25,
          border: '1px solid var(--gray200)',
          boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.05)',
        }}
      >
        <img src=""></img>
        <p
          style={{
            color: 'var(--gray400)',
          }}
        >
          오늘은 어디를 가고 싶으신가요?
        </p>
      </div>
    </div>
  );
}
