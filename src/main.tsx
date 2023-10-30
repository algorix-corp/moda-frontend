import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {RecoilRoot} from 'recoil';
import ErrorCatch from './components/ErrorBoundary';
import {ErrorBoundary} from 'react-error-boundary';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('새로운 버전을 사용할 수 있습니다. 지금 업데이트할까요?')) {
      updateSW().then();
    }
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ErrorBoundary fallbackRender={ErrorCatch}>
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    </ErrorBoundary>
  </>,
);
