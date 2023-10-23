import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Nologin from './pages/Nologin.tsx';

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {path: '/nologin', element: <Nologin/>},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="maincontainer">
    <RecoilRoot>
      <RouterProvider router={ router }/>
    </RecoilRoot>
  </div>,
);
