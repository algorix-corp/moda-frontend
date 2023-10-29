import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing.tsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Search from './pages/Search.tsx';
import SearchBar from './components/SearchBar.tsx';
import Navigator from './components/Navigator';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SearchBar />
        <Landing />
        <Navigator />
      </div>
    ),
  },
  {
    path: '/search',
    element: (
      <div>
        <SearchBar />
        <Search />
        <Navigator />
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </>
);
