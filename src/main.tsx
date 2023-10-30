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
import Preview from './pages/Preview.tsx';
import { registerSW } from 'virtual:pwa-register'
import Login from './pages/Login/Main.tsx';

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('새로운 버전을 사용할 수 있습니다. 지금 업데이트할까요?')) {
            updateSW().then()
        }
    }
});

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
        path: '/preview',
        element: (
            <div>
                <SearchBar />
                <Preview />
                <Navigator />
            </div>
        ),
    },
    {
        path: '/login',
        element: (
            <div>
                <Login />
            </div>
        )
    },
    {
        path: '*',
        element: <ErrorCatch />,
    },
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
