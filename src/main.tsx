import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing.tsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([{ path: '/', element: <Landing /> }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </>
);
