import ReactDOM from 'react-dom/client';
import Landing from './pages/Landing.tsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Search from './pages/Search.tsx';
import SearchBar from './components/SearchBar.tsx';
import Navigator from './components/Navigator';
import ErrorCatch from './components/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';

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
  {
    path: '*',
    element: <ErrorCatch />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ErrorBoundary fallbackRender={ErrorCatch}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </ErrorBoundary>
  </>
);
