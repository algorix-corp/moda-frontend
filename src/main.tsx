import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>,
)
