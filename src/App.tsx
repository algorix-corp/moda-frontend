import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Landing from './pages/Landing';
import Navigator from './components/Navigator';
import Search from './pages/Search';
import Preview from './pages/Preview';
import Login from './pages/Login/Main';
import ErrorCatch from './components/ErrorBoundary';
import { isMobileOnly } from 'react-device-detect';
import ModaLogo from './assets/moda-logo.svg';
import styled from 'styled-components';
import LoginVerify from './pages/Login/LoginVerify';
import Reserve from "./pages/Reserve";
import RegisterName from "./pages/Register/RegisterName";
import RegisterCard from "./pages/Register/RegisterCard";
import Settings from "./pages/Settings";
import TOS from "./pages/TOS";
import Privacy from "./pages/Privacy";
import NoResult from "./components/Preview/NoResult.tsx";
import SettingName from "./pages/Settings/SettingName.tsx";
import SettingVerify from "./pages/Settings/SettingVerify.tsx";
import SettingNumber from "./pages/Settings/SettingNumber.tsx";
import SettingCard from "./pages/Settings/SettingCard.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SearchBar/>
        <Landing/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/settings',
    element: (
      <div>
        <Settings/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/settings/tos',
    element: (
      <div>
        <TOS/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/settings/privacy',
    element: (
      <div>
        <Privacy/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/tos',
    element: (
      <div>
        <TOS/>
      </div>
    ),
  },
  {
    path: '/privacy',
    element: (
      <div>
        <Privacy/>
      </div>
    ),
  },
  {
    path: '/search',
    element: (
      <div>
        <SearchBar/>
        <Search/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/preview',
    element: (
      <div>
        <SearchBar/>
        <Preview/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/preview/noresult',
    element: (
      <div>
        <SearchBar/>
        <NoResult/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/reservation',
    element: (
      <div>
        <SearchBar/>
        <Reserve/>
        <Navigator/>
      </div>
    ),
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/login/verify',
    element: <LoginVerify/>,
  },
  {
    path: '/register/name',
    element: <RegisterName/>,
  },
  {
    path: '/register/card',
    element: <RegisterCard/>,
  },
  {
    path: '/settings/name',
    element: (
      <div>
        <SettingName/>
        <Navigator/>
      </div>
    )
  },
  {
    path: '/settings/phone',
    element: (
      <div>
        <SettingNumber/>
        <Navigator/>
      </div>
    )
  },
  {
    path: '/settings/verify',
    element: (
      <div>
        <SettingVerify/>
        <Navigator/>
      </div>
    )
  },
  {
    path: '/settings/card',
    element: (
      <div>
        <SettingCard/>
        <Navigator/>
      </div>
    )
  },
  {
    path: '*',
    element: <ErrorCatch/>,
  },
]);

export default function App() {
  if (isMobileOnly) {
    return <RouterProvider router={ router }/>;
  } else {
    return (
      <Container>
        <LogoArea>
          <Logo src={ ModaLogo } alt="모다"/>
          <Title>
            버스의 가격,
            <br/>
            택시의 편안함.
          </Title>
        </LogoArea>
        <DescriptionArea>
          <p>
            모다는 모바일 전용 앱이에요. 모바일로 접속하면 바로 이용하실 수
            있어요.
          </p>
        </DescriptionArea>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  padding: 100px;
  height: 100vh;
  background-color: var(--primary);
  color: var(--white);
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    height: 40%;
    flex-direction: row;
    justify-content: center;
  }
`;

const DescriptionArea = styled.div`
  width: 60%;
  height: 100%;
  overflow: scroll;

  & p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;

const Logo = styled.img`
  width: 80%;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 700;
  margin: 0;
`;
